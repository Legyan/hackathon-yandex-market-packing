from sqlalchemy.ext.asyncio import AsyncSession

from app.api.exceptions import (
    NoUserError, TableIsBusyError, UserAlreadyHaveTableError
)
from app.api.services.base import BaseService
from app.api.services.table import table_service
from app.crud.user import user_crud
from app.models.user import User


class UserService(BaseService):
    """Сервис для работы с пользователями."""

    async def check_user_exist(
        self,
        user_id: str,
        session: AsyncSession,
    ) -> User:
        user = await self.crud.get(
            user_id,
            session=session
        )
        if not user:
            raise NoUserError()

    async def check_table_user(
        self,
        user_id: int,
        table_id: int,
        session: AsyncSession
    ) -> None:
        table = await table_service.crud.get(table_id, session)
        if table and table.user_id and table.user_id != user_id:
            raise TableIsBusyError()
        table = await table_service.crud.get_table_by_user(user_id, session)
        if table and int(table.id) != table_id:
            raise UserAlreadyHaveTableError(table.id)
        table = await table_service.crud.get(int(table_id), session)


user_service = UserService(user_crud)
