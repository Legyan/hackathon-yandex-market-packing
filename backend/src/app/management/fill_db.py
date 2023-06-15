import asyncio
import contextlib
import csv

from sqlalchemy.exc import IntegrityError

from app.core.db import get_async_session
from app.crud.barcode import barcode_crud
from app.crud.cargotype import cargotype_crud
from app.crud.cartontype import cartontype_crud
from app.crud.partitions import partition_crud
from app.crud.printers import printer_crud
from app.crud.products import product_crud
from app.crud.table import table_crud
from app.crud.user import user_crud
from app.schemas.barcode import BarcodeSKUSchema
from app.schemas.cargotypes import CargotypeSchema
from app.schemas.cartontypes import CartontypeSchema
from app.schemas.partition import PartitionSchema
from app.schemas.printer import PrinterToDBSchema
from app.schemas.products import ProductSchema
from app.schemas.tables import TableSchema
from app.schemas.user import UserSchema

get_async_session_context = contextlib.asynccontextmanager(get_async_session)


async def add_products():
    with open('../data/products.csv') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        async with get_async_session_context() as session:
            for row in reader:
                product_in = ProductSchema(
                    sku=row[0],
                    title=row[1],
                    description=row[2],
                    image=row[3],
                    need_imei=row[4],
                    need_honest_sign=row[5],
                    weight=float(row[6]),
                    length=float(row[7]),
                    width=float(row[8]),
                    height=float(row[9]),
                    price=int(row[10]),
                    count=int(row[11]),
                )
                await product_crud.create(product_in, session=session)
            print('Products added to DB.')


async def add_barcode_sku():
    with open('../data/barcode_sku.csv') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        async with get_async_session_context() as session:
            for row in reader:
                barecode_in = BarcodeSKUSchema(
                    barcode=row[0],
                    sku=row[1],
                    status=row[2]
                )
                await barcode_crud.create(barecode_in, session=session)
            print('Barecode added to DB.')


async def add_tables():
    with open('../data/tables.csv') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        async with get_async_session_context() as session:
            for row in reader:
                tables_in = TableSchema(
                    name=row[0]
                )
                await table_crud.create(tables_in, session=session)
            print('Tables added to DB.')


async def add_printers():
    with open('../data/printers.csv') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        async with get_async_session_context() as session:
            for row in reader:
                printers_in = PrinterToDBSchema(
                    name=row[0]
                )
                await printer_crud.create(printers_in, session=session)
            print('Printers added to DB.')


async def add_partitions():
    with open('../data/partitions.csv') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        async with get_async_session_context() as session:
            for row in reader:
                partitions_in = PartitionSchema(
                    name=row[0]
                )
                await partition_crud.create(partitions_in, session=session)
            print('Partitions added to DB.')


async def add_users():
    with open('../data/users.csv') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        async with get_async_session_context() as session:
            for row in reader:
                users_in = UserSchema(
                    name=row[0]
                )
                await user_crud.create(users_in, session=session)
            print('Users added to DB.')


async def add_cartontypes():
    with open('../data/cartontypes.csv') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        async with get_async_session_context() as session:
            for row in reader:
                cartontype_in = CartontypeSchema(
                    tag=row[0],
                    length=float(row[1]),
                    width=float(row[2]),
                    height=float(row[3])
                )
                await cartontype_crud.create(cartontype_in, session=session)
            print('Cartontypes added to DB.')


async def add_cargotypes():
    with open('../data/cargotypes.csv') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        async with get_async_session_context() as session:
            for row in reader:
                cargotype_in = CargotypeSchema(
                    tag=row[0],
                    name=row[1]
                )
                await cargotype_crud.create(cargotype_in, session=session)
            print('Cargotypes added to DB.')


async def fill_db():
    try:
        await add_products()
        await add_barcode_sku()
        await add_tables()
        await add_partitions()
        await add_printers()
        await add_users()
        await add_cargotypes()
        await add_cartontypes()
    except IntegrityError:
        print('The database is already full.')


asyncio.run(fill_db())
