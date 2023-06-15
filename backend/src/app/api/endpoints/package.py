from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.services.package import package_service
from app.core.db import get_async_session
from app.core.users import get_current_user_id
from app.schemas.base import BaseOutputSchema
from app.schemas.packages import RemoveFromPackageSchema

router = APIRouter()


@router.get(
    '/close_package',
    response_model_exclude_none=True,
)
async def close_package(
    user_id: str = Depends(get_current_user_id),
    session: AsyncSession = Depends(get_async_session),
) -> BaseOutputSchema:
    """Закрытие коробки/пакета пользователем."""
    return await package_service.close_package(
        user_id, session
    )


@router.get(
    '/remove_from_package',
    response_model_exclude_none=True,
)
async def remove_from_package(
    barcodes: RemoveFromPackageSchema,
    user_id: str = Depends(get_current_user_id),
    session: AsyncSession = Depends(get_async_session),
) -> BaseOutputSchema:
    """Удаление товаров из коробки."""
    return await package_service.remove_from_package(
        barcodes.barcodes, user_id, session
    )
