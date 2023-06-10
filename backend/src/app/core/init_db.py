import contextlib
import csv

from sqlalchemy.exc import IntegrityError

from app.core.db import get_async_session
from app.crud.cargotype import cargotype_crud
from app.crud.cartontype import cartontype_crud
from app.schemas.cargotypes import CargotypeSchema
from app.schemas.cartontypes import CartontypeSchema

get_async_session_context = contextlib.asynccontextmanager(get_async_session)


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
        await add_cargotypes()
        await add_cartontypes()
    except IntegrityError:
        print('The database is already full')
