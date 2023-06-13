from sqlalchemy.ext.asyncio import AsyncSession

from app.api.exceptions import NoTableError
from app.crud.base import CRUDBase
from app.models.table import Table


class CRUDTable(CRUDBase):
    async def set_user_to_table(
        self,
        user_id: int,
        table_id: int,
        session: AsyncSession,
    ) -> None:
        table = await self.get(table_id, session)
        if not table:
            raise NoTableError()
        table.user_id = user_id
        session.add(table)
        await session.commit()


table_crud = CRUDTable(Table)
