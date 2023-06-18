from typing import Optional

from pydantic import BaseModel


class BarcodeDataSchema(BaseModel):
    """Схема информации о штрих-коде."""

    type: str
    info: str
    imei: bool
    honest_sign: bool


class BarcodeInfoSchema(BaseModel):
    """Схема для выдачи информаци о штрих-коде пользователю."""

    success: bool = True
    data: BarcodeDataSchema


class BarcodeInputSchema(BaseModel):
    """Схема для ввода штрихкода."""

    barcode: str


class BarcodeSKUSchema(BaseModel):
    """Схема для записи штрих-кода в базу данных."""

    barcode: str
    sku: str
    status: Optional[str]
