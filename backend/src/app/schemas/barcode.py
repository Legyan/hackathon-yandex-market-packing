from pydantic import BaseModel


class BarcodeInfoSchema(BaseModel):
    status: str
    type: str
    info: str
    imei: bool
    honest_sign: bool


class BarcodeInputSchema(BaseModel):
    barcode: str
