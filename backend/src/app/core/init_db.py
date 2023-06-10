import csv

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_async_session
from app.crud.cartontype import cartontype_crud
from app.models.cartontype import Cartontype


async def add_cartotype():
    print('Uploading cartontypes to the database ... ', end='')
    try:
        with open('../data/cartontypes.csv') as csvfile:
            reader = csv.reader(csvfile)
            session = AsyncSession(),
            for row in reader:
                await cartontype_crud.create(
                    Cartontype(
                        tag=row[0],
                        length=row[1],
                        width=row[2],
                        height=row[3]
                    ),
                    session=session
                )
            print('Cartontyped added to DB.')
    except Exception as e:
        raise TypeError(f'{e} Ошибка при загрузке типов упаковки.')
