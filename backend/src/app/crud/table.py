from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.exceptions import NoTableError
from app.crud.base import CRUDBase
from app.models.table import Table


class CRUDTable(CRUDBase):
    async def set_user_to_table(
        self,
        user_id: int,
        table_id: str,
        session: AsyncSession,
    ) -> None:
        table = await self.get_by_attribute(
            attr_name='name',
            attr_value=table_id,
            session=session
        )
        if not table:
            raise NoTableError()
        table.user_id = user_id
        session.add(table)
        await session.commit()

    async def get_table_by_user(
            self,
            user_id: int,
            session: AsyncSession
    ) -> Table:
        return (await session.execute(
            select(Table).where(Table.user_id == user_id)
        )).scalars().first()


table_crud = CRUDTable(Table)
