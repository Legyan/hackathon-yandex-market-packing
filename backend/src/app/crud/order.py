from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.exceptions import (NoProductError, OrderkeyAlreadyExistError,
                                OutOfStockError)
from app.crud.base import CRUDBase
from app.models.order import Order, OrderStatusEnum
from app.models.order_product import OrderProduct
from app.models.product import Product
from app.schemas.order import OrderCreate


class CRUDOrder(CRUDBase):
    async def add_order(
        self,
        order: OrderCreate,
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


order_crud = CRUDOrder(Order)
