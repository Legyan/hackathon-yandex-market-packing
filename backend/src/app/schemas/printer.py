from pydantic import BaseModel

from app.schemas.user import UserAuthPrinterSchema


class PrinterSchema(BaseModel):
    """Схема принтера."""

    printer_id: str


class PrinterToDBSchema(BaseModel):
    """Схема для добавления тестовых принтеров в базу данных."""

    name: str


class AuthOutputSchema(BaseModel):
    """Схема для регистрации принтера."""

    success: bool
    user: UserAuthPrinterSchema
