from sqlalchemy.ext.asyncio import AsyncSession

from app.api.services.base import BaseService
from app.api.services.pack_variation import pack_variation_service
from app.api.services.request_to_ds import get_package_recommendation
from app.crud.order import order_crud
from app.models.order import Order
from app.schemas.order import OrderCreateSchema, OrderToUserSchema


class OrderService(BaseService):
    """Сервис для работы с заказами."""

    async def add_order(
        self,
        order: OrderCreateSchema,
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
        await session.refresh(new_order)
        return new_order

    async def get_order_to_user(
        self,
        # user_id: str,
        session: AsyncSession,
    ) -> OrderToUserSchema:
        # await self.crud.check_user_order(user_id, session)
        return await self.crud.get_order_to_user(session)


order_service = OrderService(order_crud)
