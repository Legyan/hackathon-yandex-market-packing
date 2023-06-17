from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.services.barcode import barcode_service
from app.core.db import get_async_session
from app.core.users import get_current_user_id
from app.schemas.barcode import BarcodeInfoSchema, BarcodeInputSchema
from app.schemas.base import BaseOutputSchema
from app.schemas.honest_sign import HonestSignInputSchema
from app.schemas.imei import ImeiInputSchema

router = APIRouter()


@router.post(
    '',
    response_model_exclude_none=True,
)
async def handle_barcode(
    barcode: BarcodeInputSchema,
    user_id: str = Depends(get_current_user_id),
    session: AsyncSession = Depends(get_async_session),
) -> BarcodeInfoSchema:
    """Обработка штрих-кода пользоввателем."""
    return await barcode_service.handle_barcode(
        user_id, barcode.barcode, session
    )


@router.post(
    '/imei',
    response_model_exclude_none=True,
)
async def add_imei(
    imei: ImeiInputSchema,
    user_id: str = Depends(get_current_user_id),
    session: AsyncSession = Depends(get_async_session),
) -> BaseOutputSchema:
    """Обработка imei товара."""
    return await barcode_service.add_imei(
        barcode=imei.barcode, imei=imei.imei, session=session
    )


@router.post(
    '/honest_sign',
    response_model_exclude_none=True,
)
async def add_honest_sign(
    honest_sign: HonestSignInputSchema,
    user_id: str = Depends(get_current_user_id),
    session: AsyncSession = Depends(get_async_session),
) -> BaseOutputSchema:
    """Обработка "Честного знака" товара."""
    return await barcode_service.add_honest_sign(
        barcode=honest_sign.barcode,
        honest_sign=honest_sign.honest_sign,
        session=session
    )
