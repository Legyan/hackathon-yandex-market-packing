from sqlalchemy.ext.asyncio import AsyncSession

from app.api.services.base import BaseService
from app.crud.table import table_crud


class TableService(BaseService):
    """Сервис для работы со столам для упаковки."""

    async def set_user_to_table(
        self,
        user_id: str,
        table_id: str,
        session: AsyncSession,
    ) -> None:
        await self.crud.set_user_to_table(
            user_id,
            table_id,
            session
        )


table_service = TableService(table_crud)
