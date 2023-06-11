from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.services.order import order_service
from app.core.db import get_async_session
from app.schemas.order import OrderCreateSchema
from app.core.users import get_current_user_id

router = APIRouter()


@router.post(
    '/',
    response_model_exclude_none=True,
)
async def add_order(
    order: OrderCreateSchema,
    session: AsyncSession = Depends(get_async_session),
):
    """Добавление нового заказа в базу данных."""
    new_order = await order_service.add_order(order, session)
    return new_order.to_dict()


@router.get(
    '/',
    response_model_exclude_none=True,
)
async def get_order(
    user_id: str = Depends(get_current_user_id),
    session: AsyncSession = Depends(get_async_session),
):
    """Получение заказа пользователем."""
    return await order_service.get_order_to_user(user_id, session)
