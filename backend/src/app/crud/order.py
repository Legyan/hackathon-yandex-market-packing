from typing import Optional

from sqlalchemy import and_, false, select, true
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.api.exceptions import (NoProductError, NotAllBoxesClosedError,
                                NotAllOrderPackedError,
                                OrderkeyAlreadyExistError, OutOfStockError)
from app.core.constants import (FRAGILITY_CARGOTYPES, NONPACK_CARTONTYPES,
                                PACKET_CARTONTYPES)
from app.crud.base import CRUDBase
from app.crud.partition import partition_crud
from app.models.barcode_sku import BarcodeStatusEnum
from app.models.order import Order, OrderStatusEnum
from app.models.order_product import OrderProduct
from app.models.pack_variation import PackingVariation
from app.models.package import PackageProduct, PackageStatusEnum
from app.models.product import Product
from app.schemas.order import (AlreadyPackedSchema, ItemBase,
                               OrderCreateSchema, OrderDataToUser,
                               OrderToUserSchema, PackageSchema, ProductToUser)


class CRUDOrder(CRUDBase):
    async def add_order(
        self,
        order: OrderCreateSchema,
        session: AsyncSession,
    ) -> Order:
        new_order = Order()
        already_exist_orderkey = (await session.execute(
                select(Order).where(Order.orderkey == order.orderkey)
            )).scalars().first()
        if already_exist_orderkey:
            raise OrderkeyAlreadyExistError(orderkey=order.orderkey)
        new_order.orderkey = order.orderkey
        new_order.status = OrderStatusEnum.FORMING

        items = []
        for item in order.items:
            product = (await session.execute(
                select(Product).where(Product.sku == item.sku)
            )).scalars().first()
            if not product:
                raise NoProductError()
            if product.count < item.count:
                raise OutOfStockError()
            product.count -= item.count
            session.add(product)
            order_product = OrderProduct(
                orderkey=new_order.orderkey, sku=product.sku, count=item.count
            )
            items.append(order_product)
        new_order.products = items

        session.add(new_order)
        await session.commit()
        await session.refresh(new_order)
        return new_order

    async def get_order_products_info(
        self,
        order: Order,
        session: AsyncSession
    ) -> OrderToUserSchema:
        order_data = OrderDataToUser(
            orderkey=order.orderkey
        )
        await session.refresh(order)
        goods = []
        for order_product in order.products:
            product = (await session.execute(
                select(Product)
                .options(joinedload(Product.cargotypes))
                .where(Product.sku == order_product.sku)
            )).scalars().first()
            fragility = False
            for cargotype in product.cargotypes:
                if cargotype.cargotype_tag in FRAGILITY_CARGOTYPES:
                    fragility = True
            product_to_user = ProductToUser(
                sku=product.sku,
                title=product.title,
                description=product.description,
                image=product.image,
                imei=product.need_imei,
                honest_sign=product.need_honest_sign,
                fragility=fragility,
                count=order_product.count
            )
            goods.append(product_to_user)
        order_data.goods = goods

        recomend_packing = []
        packing_variations = (await session.execute(
            select(PackingVariation)
            .options(joinedload(PackingVariation.packages))
            .where(
                and_(
                    PackingVariation.orderkey == order.orderkey,
                    PackingVariation.is_recommendation.is_(true())
                )
            )
        )).scalars().unique().all()
        if not packing_variations:
            return OrderToUserSchema(
                data=order_data
            )
        for packing_variation in packing_variations:

            packages = []
            for package in packing_variation.packages:

                items_dict = {}
                package_to_user = PackageSchema(
                    cartontype=package.cartontype_tag
                )
                package_to_user.icontype = await self.get_icontype(
                    package.cartontype_tag
                )
                package_products = (await session.execute(
                    select(PackageProduct)
                    .where(PackageProduct.package_id == package.id)
                )).scalars().all()
                for product in package_products:
                    items_dict[product.product_sku] = (
                        items_dict.get(product.product_sku, 0) + 1
                    )
                items = []
                for item in items_dict.items():
                    items.append(ItemBase(
                        sku=item[0],
                        count=item[1]
                    ))
                package_to_user.items = items
                packages.append(package_to_user)
            recomend_packing.append(packages)
        order_data.recomend_packing = recomend_packing
        return OrderToUserSchema(
            data=order_data
        )

    async def get_new_order(
        self,
        session: AsyncSession
    ) -> Optional[Order]:
        return (await session.execute(
                select(Order)
                .options(joinedload(Order.products))
                .where(Order.status == OrderStatusEnum.WAITING)
                )).scalars().first()

    async def get_already_packaged(
        self,
        orderkey: str,
        session: AsyncSession
    ) -> Optional[list[AlreadyPackedSchema]]:
        packages = []
        already_packed = (await session.execute(
            select(PackingVariation)
            .options(joinedload(PackingVariation.packages))
            .where(
                and_(
                    PackingVariation.orderkey == orderkey,
                    PackingVariation.is_recommendation.is_(false())
                )
            )
        )).scalars().first()
        if not already_packed:
            return packages
        for package in already_packed.packages:
            items_dict = {}
            if package.status == PackageStatusEnum.PACKED:
                is_closed_package = True
            else:
                is_closed_package = False
            package_to_user = AlreadyPackedSchema(
                cartontype=package.cartontype_tag,
                is_packaged=is_closed_package
            )
            package_to_user.icontype = await self.get_icontype(
                package.cartontype_tag
            )
            package_products = (await session.execute(
                select(PackageProduct)
                .where(PackageProduct.package_id == package.id)
            )).scalars().all()
            for product in package_products:
                items_dict[product.product_sku] = (
                    items_dict.get(product.product_sku, 0) + 1
                )
            items = []
            for item in items_dict.items():
                items.append(ItemBase(
                    sku=item[0],
                    count=item[1]
                ))
            package_to_user.items = items
            packages.append(package_to_user)
        return packages

    async def set_order_status(
        self,
        orderkey: str,
        status: OrderStatusEnum,
        session: AsyncSession
    ) -> Order:
        order = (await session.execute(
            select(Order).where(Order.orderkey == orderkey)
        )).scalars().first()
        order.status = status
        session.add(order)
        await session.commit()
        await session.refresh(order)
        return order

    async def set_order_packer(
        self,
        orderkey: str,
        user_id: int,
        session: AsyncSession
    ) -> Order:
        order = (await session.execute(
            select(Order).where(Order.orderkey == orderkey)
        )).scalars().first()
        order.packer_user_id = user_id
        session.add(order)
        await session.commit()
        await session.refresh(order)
        return order

    async def get_order_by_user_id(
        self,
        user_id: str,
        session: AsyncSession
    ) -> Order:
        return (await session.execute(
            select(Order)
            .options(joinedload(Order.products))
            .where(
                and_(
                    Order.status == OrderStatusEnum.COLLECT,
                    Order.packer_user_id == user_id)
            )
        )).scalars().first()

    async def get_order_by_user_id_with_barcodes(
        self,
        user_id: str,
        session: AsyncSession
    ) -> Order:
        return (await session.execute(
            select(Order)
            .options(joinedload(Order.barcodes))
            .where(
                and_(
                    # Order.status == OrderStatusEnum.COLLECT,
                    Order.packer_user_id == user_id)
            )
        )).scalars().first()

    async def get_order_with_products(
            self,
            orderkey: str,
            session: AsyncSession
    ) -> Order:
        return (await session.execute(
            select(Order)
            .options(joinedload(Order.products))
            .where(Order.orderkey == orderkey)
        )).scalars().first()

    async def check_order_readiness(
        self,
        order: Order,
        pack_variation: PackingVariation,
        session: AsyncSession
    ) -> None:
        orderkey = order.orderkey
        products = (await session.execute(
            select(OrderProduct).where(OrderProduct.orderkey == orderkey)
        )).scalars().all()
        products_count = 0
        for product in products:
            products_count += product.count
        products_in_cart = 0
        for package in pack_variation.packages:
            if package.status != PackageStatusEnum.PACKED:
                raise NotAllBoxesClosedError()
            package_products = (
                await session.execute(
                    select(PackageProduct)
                    .where(PackageProduct.package_id == package.id)
                )
            ).scalars().all()
            products_in_cart += len(package_products)
        if products_count > products_in_cart:
            raise NotAllOrderPackedError()

    async def finish_order(
        self,
        order: Order,
        session: AsyncSession
    ) -> None:
        await session.refresh(order)
        order.status = OrderStatusEnum.COLLECTED
        partition = await partition_crud.get_by_attribute(
            attr_name='orderkey',
            attr_value=order.orderkey,
            session=session
        )
        partition.orderkey = None
        session.add(partition)
        await session.flush()
        order_with_barcodes = await self.get_order_by_user_id_with_barcodes(
            user_id=order.packer_user_id,
            session=session
        )
        for barcode in order_with_barcodes.barcodes:
            barcode.status = BarcodeStatusEnum.NOT_ALLOWED
            session.add(barcode)
        session.add(order)
        await session.flush()
        await session.commit()

    async def get_icontype(
        self,
        cargotype_tag: str
    ) -> str:
        match cargotype_tag:
            case tag if tag in NONPACK_CARTONTYPES:
                return cargotype_tag
            case tag if tag in PACKET_CARTONTYPES:
                return 'packet'
        return 'box'


order_crud = CRUDOrder(Order)
