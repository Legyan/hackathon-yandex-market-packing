from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.services.user import user_service
from app.core.db import get_async_session
from app.core.users import get_current_user_id
from app.schemas.base import BaseOutputSchema
from app.schemas.user import UserInfoSchema

router = APIRouter()


@router.get(
    '',
)
async def get_user_info(
    user_id: str = Depends(get_current_user_id),
    session: AsyncSession = Depends(get_async_session),
) -> UserInfoSchema:
    """Получение информации о пользователе по токену."""

    return await user_service.get_user_info(
        user_id, session
    )


@router.get(
    '/logout',
)
async def logout(
    user_id: str = Depends(get_current_user_id),
    session: AsyncSession = Depends(get_async_session),
) -> BaseOutputSchema:
    """Отвязывание стола и принтера от пользователя."""

    return await user_service.logout(
        user_id, session
    )
