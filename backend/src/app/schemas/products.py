from pydantic import BaseModel


class ProductSchema(BaseModel):
    """Схема товаров."""

    sku: str
    title: str
    description: str
    image: str
    need_imei: bool
    need_honest_sign: bool
    weight: float
    length: float
    width: float
    height: float
    price: int
    count: int
