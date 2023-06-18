from typing import Optional

from pydantic import BaseModel


class BarcodeDataSchema(BaseModel):
    type: str
    info: str
    imei: bool
    honest_sign: bool


class BarcodeInfoSchema(BaseModel):
    success: bool = True
    data: BarcodeDataSchema


class BarcodeInputSchema(BaseModel):
    barcode: str


class BarcodeSKUSchema(BaseModel):
    barcode: str
    sku: str
    status: Optional[str]
