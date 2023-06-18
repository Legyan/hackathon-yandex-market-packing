import asyncio
import json
import random
import string

from httpx import AsyncClient


DS_URL = 'http://localhost:8000/api/v1/order'
SYMBOLS = string.ascii_lowercase + string.digits


async def get_random_orderkey(length=15):
    """Генерация случайного номера заказов."""

    return ''.join(random.choice(SYMBOLS) for _ in range(length))


async def add_orders():
    """Добавление тестовых заказов."""

    with open('../data/orders.json') as f:
        data = json.load(f)
        client = AsyncClient()
        for order in data['test_orders']:
            print(order)
            print('-'*100)
            order['orderkey'] = await get_random_orderkey()
            order_json = json.dumps(order)
            print(order_json)
            await send_add_order(
                data=order_json,
                client=client
            )


async def send_add_order(
        data: str,
        client: AsyncClient
) -> None:
    """Запрос в бэкенд для добавления заказа."""

    response = await client.post(
        url=DS_URL,
        data=data
    )
    response.raise_for_status()
    data = response.json()

asyncio.run(add_orders())
