from pydantic import BaseModel


class ImeiInputSchema(BaseModel):
    """Схема для обработки IMEI товара."""

    barcode: str
    imei: str
