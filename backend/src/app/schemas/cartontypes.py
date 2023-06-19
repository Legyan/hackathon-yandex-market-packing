from pydantic import BaseModel


class CartontypeSchema(BaseModel):
    """Схема упаковки."""

    tag: str
    length: float
    width: float
    height: float
