from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.crud.printer import printer_crud
from app.crud.table import table_crud
from app.models.user import User


class CRUDUser(CRUDBase):
    """CRUD пользователей."""

    async def unlink_table(
        self,
        user_id: int,
        session: AsyncSession
    ) -> None:
        """Открепление пользователя от стола."""

        table = await table_crud.get_by_attribute(
            attr_name='user_id',
            attr_value=user_id,
            session=session
        )
        if not table:
            return
        table.user_id = None
        session.add(table)
        await session.commit()

    async def unlink_printer(
        self,
        user_id: int,
        session: AsyncSession
    ) -> None:
        """Открепление пользователя от принтера."""

        printer = await printer_crud.get_by_attribute(
            attr_name='user_id',
            attr_value=user_id,
            session=session
        )
        if not printer:
            return
        printer.user_id = None
        session.add(printer)
        await session.commit()


user_crud = CRUDUser(User)
