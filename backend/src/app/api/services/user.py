from sqlalchemy.ext.asyncio import AsyncSession

from app.api.exceptions import NoUserError
from app.api.services.base import BaseService
from app.crud.user import user_crud
from app.models.user import User


class UserService(BaseService):
    """Сервис для работы с пользователями."""

    async def chek_user_exist(
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


user_service = UserService(user_crud)
