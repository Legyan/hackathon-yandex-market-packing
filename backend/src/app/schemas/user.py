from typing import Optional

from pydantic import BaseModel


class UserSchema(BaseModel):
    """Схема для добавления тестовых пользователей
    в базу данных."""

    name: str
    id: int


class UserAuthPrinterSchema(BaseModel):
    """Схема для присвоения пользователю принтера."""

    user_id: int
    table_id: str
    printer_id: str


class UserDataSchema(BaseModel):
    """Схема информации о пользователе."""

    username: str
    user_id: int
    table_id: Optional[str] = None
    printer_id: Optional[str] = None


class UserInfoSchema(BaseModel):
    """Схема для предоставления информации о пользователе."""

    data: UserDataSchema
    success: bool = True
