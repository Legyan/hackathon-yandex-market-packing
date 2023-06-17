from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.services.order import order_service
from app.core.db import get_async_session
from app.core.users import get_current_user_id
from app.schemas.base import BaseOutputSchema
from app.schemas.order import (ItemBase, OrderCreateResponseSchema,
                               OrderCreateSchema, OrderDataToUser,
                               OrderToUserSchema, PackageSchema, ProductToUser)

router = APIRouter()


@router.post(
    '/',
    response_model_exclude_none=True,
)
async def add_order(
    order: OrderCreateSchema,
    session: AsyncSession = Depends(get_async_session),
) -> OrderCreateResponseSchema:
    """Добавление нового заказа в базу данных."""
    return await order_service.add_order(order, session)


@router.get(
    '/',
    response_model_exclude_none=True,
)
async def get_order(
    user_id: str = Depends(get_current_user_id),
    session: AsyncSession = Depends(get_async_session),
) -> OrderToUserSchema:
    """Получение заказа пользователем."""
    return await order_service.get_order_to_user(user_id, session)
    product_to_user_1 = ProductToUser(
        sku='sku111111111111111111111',
        title='Яндекс станция с Алисой',
        description='Внутри Алиса',
        image='https://cdn.rbt.ru/images/'
        'gen/item_image/image/8581/23/858018_r6048.jpg',
        imei=False,
        honest_sign=True,
        fragility=True,
        count=2,
    )
    product_to_user_2 = ProductToUser(
        sku='sku222222222222222222222',
        title='Яндекс станция без Алисы',
        description='Внутри нет Алисы',
        image='https://cdn.rbt.ru/images/'
        'gen/item_image/image/8581/23/858018_r6048.jpg',
        imei=True,
        honest_sign=True,
        fragility=False,
        count=3,
    )
    r1p1 = PackageSchema(
        cartontype='MYB',
        icontype='box',
        items=[
            ItemBase(sku='sku222222222222222222222', count=3),
            ItemBase(sku='sku111111111111111111111', count=2),
        ],
    )
    r2p1 = PackageSchema(
        cartontype='NONPACK',
        icontype='NONPACK',
        items=[ItemBase(sku='sku222222222222222222222', count=1)],
    )
    r2p2 = PackageSchema(
        cartontype='EXB',
        icontype='packet',
        items=[
            ItemBase(sku='sku222222222222222222222', count=2),
            ItemBase(sku='sku111111111111111111111', count=2),
        ],
    )
    r3p1 = PackageSchema(
        cartontype='STRETCH',
        icontype='STRETCH',
        items=[
            ItemBase(sku='sku222222222222222222222', count=3),
            ItemBase(sku='sku111111111111111111111', count=1),
        ],
    )
    r3p2 = PackageSchema(
        cartontype='ZEX',
        icontype='box',
        items=[ItemBase(sku='sku111111111111111111111', count=1)],
    )
    recommendation1 = [r1p1]
    recommendation2 = [r2p1, r2p2]
    recommendation3 = [r3p1, r3p2]
    data = OrderDataToUser(
        partition='test_partition',
        orderkey='test_order_to_front',
        goods=[product_to_user_1, product_to_user_2],
        recomend_packing=[recommendation1, recommendation2, recommendation3],
        already_packed=[],
    )
    return OrderToUserSchema(data=data, status='ok')


@router.get(
    '/finish',
    response_model_exclude_none=True,
)
async def finish_order(
    user_id: str = Depends(get_current_user_id),
    session: AsyncSession = Depends(get_async_session),
) -> BaseOutputSchema:
    """Завершение заказа пользователем."""
    return await order_service.finish_order(user_id, session)
