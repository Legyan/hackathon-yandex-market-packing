from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.services.barcode import barcode_service
from app.core.db import get_async_session
from app.core.users import get_current_user_id
from app.schemas.barcode import BarcodeInputSchema

router = APIRouter()


@router.post(
    '/barcode',
    response_model_exclude_none=True,
)
async def handle_barcode(
    barcode: BarcodeInputSchema,
    user_id: str = Depends(get_current_user_id),
    session: AsyncSession = Depends(get_async_session),
):
    """Обработка штрих-кода пользоввателем."""
    return await barcode_service.handle_barcode(
        user_id, barcode.barcode, session
    )
