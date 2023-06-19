from pydantic import BaseModel


class RegisterTableSchema(BaseModel):
    """Схема регистрации стола."""

    user_id: int
    table_id: str


class TokenSchema(BaseModel):
    """Схема токена."""

    token: str
    success: bool = True
