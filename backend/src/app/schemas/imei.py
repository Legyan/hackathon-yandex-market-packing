from pydantic import BaseModel


class ImeiInputSchema(BaseModel):
    barcode: str
    imei: str
