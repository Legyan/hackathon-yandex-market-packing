from typing import Optional

from pydantic import BaseModel, Extra, Field


class ItemBase(BaseModel):
    """Базовая схема товара."""

    sku: str
    count: int = Field(1, gt=0)

    class Config:
        extra = Extra.forbid


class ItemToDS(ItemBase):
    """Базовая схема товара для DS."""

    size1: Optional[str] = None
    size2: Optional[str] = None
    size3: Optional[str] = None
    weight: Optional[str] = None
    type: list[Optional[str]]


class OrderCreateSchema(BaseModel):
    """Базовая схема для создания заказа."""

    orderkey: str
    items: list[ItemBase]

    class Config:
        extra = Extra.forbid


class OrderCreateResponseSchema(BaseModel):
    """Схема ответа на создание заказа."""

    orderkey: str
    status: str


class OrderToDS(BaseModel):
    """Схема для заказа из DS."""

    orderId: str # noqa
    items: list[ItemToDS]


class ProductToUser(BaseModel):
    """Схема товара в заказе для пользователя."""

    sku: str
    title: str
    description: Optional[str]
    image: Optional[str]
    imei: bool
    honest_sign: bool
    fragility: bool
    count: int


class PackageSchema(BaseModel):
    """Схема упаковки пользователем."""

    cartontype: str = ''
    icontype: str = ''
    items: list[ItemBase] = []


class AlreadyPackedSchema(PackageSchema):
    """Схема упаковки пользователем с информацией о закрытии."""

    is_packaged: bool = False


class OrderDataToUser(BaseModel):
    """Схема информации о заказе для пользователя."""

    partition: str = ''
    orderkey: str = ''
    goods: list[ProductToUser] = []
    recomend_packing: list[list[PackageSchema]] = [[PackageSchema()]]
    already_packed: list[AlreadyPackedSchema] = [AlreadyPackedSchema()]


class OrderToUserSchema(BaseModel):
    """Схема для выдачи заказа пользователю."""

    data: OrderDataToUser
    status: str = 'ok'
