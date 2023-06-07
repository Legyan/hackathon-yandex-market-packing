from sqlalchemy import select

from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.order import Order, OrderStatusEnum
from app.models.product import Product
from app.schemas.order import OrderCreate
from app.models.order_product import OrderProduct


class NoProductError(Exception):
    pass


class OutOfStockError(Exception):
    pass


class CRUDOrder(CRUDBase):
    async def add_order(
        self,
        order: OrderCreate,
        session: AsyncSession,
    ) -> Order:
        new_order = Order()
        new_order.orderkey = order.orderkey
        new_order.status = OrderStatusEnum.FORMING
        items = []
        for item in order.items:
            product = (await session.execute(
                select(Product).where(
                    Product.sku == item.sku
                )
            )).scalars().first()
            if not product:
                raise NoProductError('Такого товара нет в базе данных.')
            if product.count < item.count:
                raise OutOfStockError('Недостаточно единиц товара на складе.')
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


order_crud = CRUDOrder(Order)
