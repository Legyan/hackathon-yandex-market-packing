from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_async_session
from app.crud.order import order_crud
from app.schemas.order import OrderCreate

router = APIRouter()


@router.post(
    '/',
    response_model_exclude_none=True,
)
async def add_order(
    order: OrderCreate,
    session: AsyncSession = Depends(get_async_session),
):
    """Добавляет новый заказ."""
    new_order = await order_crud.add_order(order, session)
    return new_order.to_dict()
