import asyncio
import contextlib
import csv
import random
import string

from app.core.db import get_async_session
from app.crud.barcode import barcode_crud

from app.schemas.barcode import BarcodeSKUSchema


get_async_session_context = contextlib.asynccontextmanager(get_async_session)


async def get_random_barcode(length=14):
    """Генерация случайных штрих-кодов."""

    return ''.join(random.choice(string.digits) for _ in range(length))


async def add_random_barcode_sku():
    """Добавление штрих-кодов товаров для теста."""

    with open('../data/barcode_sku.csv') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        async with get_async_session_context() as session:
            for row in reader:
                for _ in range(5):
                    barcode = await get_random_barcode()
                    await barcode_crud.create(
                        BarcodeSKUSchema(
                            barcode=barcode,
                            sku=row[1],
                            status=row[2]
                        ),
                        session=session)
            print('Random barecodes added to DB.')


asyncio.run(add_random_barcode_sku())
