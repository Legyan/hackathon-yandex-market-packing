import asyncio
import json
import random
import string

from httpx import AsyncClient

from app.core.constants import ADD_ORDERS_URL


async def get_random_orderkey(length=15):
    """Генерация случайного номера заказов."""

    return ''.join(
        random.choice(string.ascii_lowercase + string.digits)
        for _ in range(length)
    )


async def add_orders():
    """Добавление тестовых заказов."""

    with open('../data/orders.json') as f:
        data = json.load(f)
        client = AsyncClient()
        for order in data['test_orders']:
            order['orderkey'] = await get_random_orderkey()
            order_json = json.dumps(order)
            await client.post(
                url=ADD_ORDERS_URL,
                data=order_json
            )
        print('Тестовые заказы загружены.')


asyncio.run(add_orders())
