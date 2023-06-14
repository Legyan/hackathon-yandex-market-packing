from pydantic import BaseModel


class HonestSignInputSchema(BaseModel):
    barcode: str
    honest_sign: str
