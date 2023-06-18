import asyncio
import contextlib

from sqlalchemy import delete

from app.core.db import get_async_session
from app.models import (BarcodeSKU, Cargotype, Cartontype, HonestSign, Imei,
                        Order, OrderProduct, Package, PackageProduct,
                        PackingVariation, Partition, Printer, Product,
                        ProductCargotype, Table, User)

get_async_session_context = contextlib.asynccontextmanager(get_async_session)


async def delete_all_in_table(model):
    """Удаление данных в таблице базы данных."""

    async with get_async_session_context() as session:
        await session.execute(
            delete(model)
        )
        await session.commit()
    print(f'All {model.__name__} deleted from DB.')


async def clear_db():
    """Удаление данных из базы данных."""

    await delete_all_in_table(HonestSign)
    await delete_all_in_table(Imei)
    await delete_all_in_table(PackageProduct)
    await delete_all_in_table(OrderProduct)
    await delete_all_in_table(BarcodeSKU)
    await delete_all_in_table(ProductCargotype)
    await delete_all_in_table(Cargotype)
    await delete_all_in_table(Package)
    await delete_all_in_table(Cartontype)
    await delete_all_in_table(PackingVariation)
    await delete_all_in_table(Partition)
    await delete_all_in_table(Product)
    await delete_all_in_table(HonestSign)
    await delete_all_in_table(Order)
    await delete_all_in_table(Printer)
    await delete_all_in_table(Table)
    await delete_all_in_table(User)


asyncio.run(clear_db())
