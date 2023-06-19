from pydantic import BaseModel, Field


class RegisterTableSchema(BaseModel):
    """Схема регистрации стола."""

    user_id: int = Field(1, gt=0)
    table_id: str = Field('APACK2')


class TokenSchema(BaseModel):
    """Схема токена."""

    token: str
    success: bool = True
