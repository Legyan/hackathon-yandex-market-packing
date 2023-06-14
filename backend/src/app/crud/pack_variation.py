from sqlalchemy import and_, false, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.crud.order import order_crud
from app.models.cartontype import Cartontype
from app.models.order import OrderStatusEnum
from app.models.pack_variation import PackingVariation
from app.models.package import Package, PackageProduct, PackageStatusEnum
from app.schemas.pack_variation import PackingVariationsSchema


class CRUDPackingVariation(CRUDBase):
    async def write_pack_variations_to_db(
        self,
        packing_variations: PackingVariationsSchema,
        session: AsyncSession,
    ) -> None:
        if packing_variations.status == 'fallback':
            order_crud.set_order_status(
                orderkey=packing_variations.orderkey,
                status=OrderStatusEnum.WAITING,
                session=session
            )
            return
        for pack_variation in packing_variations.recommendations:
            new_pack_variation = PackingVariation(
                is_recommendation=True,
                selected=False,
                orderkey=packing_variations.orderkey
            )
            session.add(new_pack_variation)
            await session.commit()
            await session.refresh(new_pack_variation)
            for package in pack_variation:
                cartontype = (await session.execute(
                    select(Cartontype)
                    .where(Cartontype.tag == package.cartontype)
                )).scalars().first()
                if not cartontype:
                    # logging.error(
                    # f'Дропки {package.cartontype} нет в базе данных.'
                    # )
                    return
                await session.refresh(new_pack_variation)
                new_package = Package(
                    cartontype_tag=cartontype.tag,
                    packing_variation_id=new_pack_variation.id,
                    status=PackageStatusEnum.INACTIVE
                )
                session.add(new_package)
                await session.commit()
                await session.refresh(new_package)
                for product_sku in package.goods:
                    new_package_product = PackageProduct(
                        package_id=new_package.id,
                        product_sku=product_sku
                    )
                    session.add(new_package_product)
                await session.commit()

        await order_crud.set_order_status(
                orderkey=packing_variations.orderkey,
                status=OrderStatusEnum.WAITING,
                session=session
            )

    async def add_active_pack_variation(
            self,
            orderkey: str,
            session: AsyncSession
    ) -> None:
        pack_variation = PackingVariation(
            orderkey=orderkey,
            selected=False,
            is_recommendation=False
        )
        session.add(pack_variation)
        await session.commit()
        await session.refresh(pack_variation)

    async def get_active_pack_variation(
            self,
            orderkey: str,
            session: AsyncSession
    ) -> PackingVariation:
        return (await session.execute(
            select(PackingVariation)
            .where(
                and_(
                    PackingVariation.orderkey == orderkey,
                    PackingVariation.is_recommendation.is_(false())
                )
            )
        )).scalars().first()


pack_variation_crud = CRUDPackingVariation(PackingVariation)
