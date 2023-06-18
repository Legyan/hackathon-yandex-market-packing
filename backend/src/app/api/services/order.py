from sqlalchemy.ext.asyncio import AsyncSession

from app.api.exceptions import NoActiveOrderError
from app.api.services.base import BaseService
from app.api.services.pack_variation import pack_variation_service
from app.crud.order import order_crud
from app.crud.pack_variation import pack_variation_crud
from app.crud.partition import partition_crud
from app.models.order import OrderStatusEnum
from app.schemas.base import BaseOutputSchema
from app.schemas.order import (OrderCreateResponseSchema, OrderCreateSchema,
                               OrderDataToUser, OrderToUserSchema)


class OrderService(BaseService):
    """Сервис для работы с заказами."""

    async def add_order(
        self,
        order: OrderCreateSchema,
        session: AsyncSession,
    ) -> OrderCreateResponseSchema:
        """Добавление заказа."""

        new_order = await self.crud.add_order(order, session)
        package_recommendations = await (
            pack_variation_service.get_package_recommendation(
                orderkey=new_order.orderkey,
                session=session
            )
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
        """Получение заказа пользователем."""

        order = await self.crud.get_order_by_user_id(
            user_id=user_id,
            session=session
        )
        if not order:
            order_is_active = False
            order = await self.crud.get_new_order(session)
            if not order:
                return OrderToUserSchema(
                    data=OrderDataToUser(),
                    status='No orders to pack'
                )
        else:
            order_is_active = True
        order: OrderToUserSchema = await self.crud.get_order_products_info(
            order=order,
            session=session
        )
        order.data.already_packed = await self.crud.get_already_packaged(
                orderkey=order.data.orderkey,
                session=session
        )
        if not order_is_active:

            await self.crud.set_order_packer(
                orderkey=order.data.orderkey,
                user_id=user_id,
                session=session
            )
            await self.crud.set_order_status(
                orderkey=order.data.orderkey,
                status=OrderStatusEnum.COLLECT,
                session=session
            )
            order.data.partition = await partition_crud.set_partition_to_order(
                orderkey=order.data.orderkey,
                session=session
            )
            await pack_variation_service.add_active_pack_variation(
                orderkey=order.data.orderkey,
                session=session
            )
        else:

            partition = await partition_crud.get_by_attribute(
                attr_name='orderkey',
                attr_value=order.data.orderkey,
                session=session
            )
            order.data.partition = partition.name
        return order

    async def finish_order(
        self,
        user_id: int,
        session: AsyncSession
    ) -> BaseOutputSchema:
        """Завершение заказа."""

        order = await self.crud.get_order_by_user_id(user_id, session)
        if not order:
            raise NoActiveOrderError()
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
