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
    '''Добавляет новый заказ.'''
    new_order = await order_crud.add_order(order, session)
    return new_order.to_dict()


@router.get(
    '/',
    response_model_exclude_none=True,
)
async def get_order(
    session: AsyncSession = Depends(get_async_session),
):
    """Получение заказа пользователем."""
    return {
        'orderkey': '441241ada',
        'goods': [
            {
                'sku': '321dsa',
                'title': 'Тарелка',
                'description': 'Тарелка 20 см',
                'image': 'https://images.satu.kz/180057753_tarelka-9-diametr.jpg',
                'imei': False,
                'honest_sign': False,
                'fragility': True
            },
            {
                'sku': '322dsa',
                'title': 'Яндекс Станция',
                'description': 'Колонка с Алисой',
                'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYs6EQdrFWklrCqCcXQr8mN1vQ4ePN5N8hAA&usqp=CAU',
                'imei': False,
                'honest_sign': False,
                'fragility': False
            }
        ],
        'recomend_packing': [
            [
                {
                    'cartontype': 'carton3',
                    'items': [
                        {
                            'sku': '322dsa',
                            'count': 2
                        },
                        {
                            'sku': '321dsa',
                            'count': 1
                        },
                    ]
                }
            ],
            [
                {
                    'cartontype': 'packet2',
                    'items': [
                        {
                            'sku': '322dsa',
                            'count': 2
                        },
                        {
                            'sku': '321dsa',
                            'count': 1
                        },
                    ]
                }
            ]
        ]
    }
