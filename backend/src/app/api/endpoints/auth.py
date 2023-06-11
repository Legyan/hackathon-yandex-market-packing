import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.services.table import table_service
from app.api.services.user import user_service
from app.core.db import get_async_session
from app.core.config import settings
from app.schemas.auth import RegisterTableSchema, TokenSchema

import jwt


router = APIRouter()


@router.post(
    '/register_table',
    response_model_exclude_none=True,
)
async def register_table(
    data: RegisterTableSchema,
    session: AsyncSession = Depends(get_async_session),
) -> TokenSchema:
    """Регистрация пользоватлея за столом и выдача ему токена."""
    await user_service.chek_user_exist(data.user_id, session)
    await table_service.set_user_to_table(data.user_id, data.table_id, session)
    token_data = {
        "user_id": data.user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=12)
    }

    token = jwt.encode(token_data, settings.secret_key, algorithm="HS256")
    return TokenSchema(token=token)

@router.post(
    '/register_printer',
    response_model_exclude_none=True,
)
async def register_table(
    data: RegisterTableSchema,
    session: AsyncSession = Depends(get_async_session),
) -> TokenSchema:
    """Регистрация пользоватлея за столом и выдача ему токена."""
    await user_service.chek_user_exist(data.user_id, session)
    await table_service.set_user_to_table(data.user_id, data.table_id, session)
    token_data = {
        "user_id": data.user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=12)
    }

    token = jwt.encode(token_data, settings.secret_key, algorithm="HS256")
    return TokenSchema(token=token)