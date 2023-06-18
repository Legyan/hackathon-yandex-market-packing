from pydantic import BaseModel


class HonestSignInputSchema(BaseModel):
    """Схема для обработки маркировки "Честный знак"."""

    barcode: str
    honest_sign: str
