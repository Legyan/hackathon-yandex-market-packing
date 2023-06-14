from sqlalchemy.ext.asyncio import AsyncSession

from app.api.services.base import BaseService
from app.api.services.pack_variation import pack_variation_service
from app.api.services.request_to_ds import get_package_recommendation
from app.crud.order import order_crud
from app.crud.pack_variation import pack_variation_crud
from app.crud.partitions import partition_crud
from app.schemas.base import BaseOutputSchema
from app.schemas.order import (OrderCreateResponseSchema, OrderCreateSchema,
                               OrderToUserSchema)


class OrderService(BaseService):
    """Сервис для работы с заказами."""

    async def add_order(
        self,
        order: OrderCreateSchema,
        session: AsyncSession,
    ) -> OrderCreateResponseSchema:
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
        return OrderCreateResponseSchema(
            orderkey=new_order.orderkey,
            status=new_order.status.value
        )

    async def get_order_to_user(
        self,
        user_id: int,
        session: AsyncSession,
    ) -> OrderToUserSchema:
        # await self.crud.check_user_order(user_id, session)
        order: OrderToUserSchema = await self.crud.get_order_to_user(session)
        await self.crud.set_order_packer(
            orderkey=order.orderkey,
            user_id=user_id,
            session=session
        )
        order.partition = await partition_crud.set_partition_to_order(
            orderkey=order.orderkey,
            session=session
        )
        await pack_variation_service.add_active_pack_variation(
            orderkey=order.orderkey,
            session=session
        )
        return order

    async def finish_order(
        self,
        user_id: int,
        session: AsyncSession
    ) -> BaseOutputSchema:
        order = await self.crud.get_order_by_user_id(user_id, session)
        pack_variation = (
            await pack_variation_crud.get_active_pack_variation(
                orderkey=order.orderkey,
                session=session
            )
        )
        await self.crud.check_order_readiness(
            order,
            pack_variation,
            session
        )
        await self.crud.finish_order(order, session)
        return BaseOutputSchema()


order_service = OrderService(order_crud)
