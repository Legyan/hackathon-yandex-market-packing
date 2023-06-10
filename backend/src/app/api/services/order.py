from sqlalchemy.ext.asyncio import AsyncSession

from app.api.services.base import BaseService
from app.api.services.pack_variation import pack_variation_service
from app.api.services.request_to_ds import get_package_recommendation
from app.crud.order import order_crud
from app.models.order import Order
from app.schemas.order import OrderCreate


class OrderService(BaseService):
    """Сервис для работы с заказами."""

    async def add_order(
        self,
        order: OrderCreate,
        session: AsyncSession,
    ) -> Order:
        new_order = await self.crud.add_order(order, session)
        package_recommendations = await get_package_recommendation(
            orderkey=new_order.orderkey,
            session=session
        )
        await pack_variation_service.write_pack_variations_to_db(
            packing_variations=package_recommendations,
            session=session
        )
        return new_order


order_service = OrderService(order_crud)
