from typing import Optional

from pydantic import BaseModel, Extra


class ItemBase(BaseModel):
    sku: str
    count: int

    class Config:
        extra = Extra.forbid


class ItemToDS(ItemBase):
    size1: Optional[str] = None
    size2: Optional[str] = None
    size3: Optional[str] = None
    weight: Optional[str] = None
    type: list[Optional[str]]


class OrderCreateSchema(BaseModel):
    orderkey: str
    items: list[ItemBase]

    class Config:
        extra = Extra.forbid


class OrderCreateResponseSchema(BaseModel):
    orderkey: str
    status: str


class OrderToDS(BaseModel):
    orderId: str
    items: list[ItemToDS]


class ProductToUser(BaseModel):
    sku: str
    title: str
    description: Optional[str]
    image: Optional[str]
    imei: bool
    honest_sign: bool
    fragility: bool
    count: int


class PackageSchema(BaseModel):
    cartontype: str = '',
    icontype: str = ''
    items: list[ItemBase] = []


class AlreadyPackedSchema(PackageSchema):
    is_packaged: bool


class OrderDataToUser(BaseModel):
    partition: str = ''
    orderkey: str = ''
    goods: list[ProductToUser] = []
    recomend_packing: list[list[PackageSchema]] = [[PackageSchema()]]
    already_packed: list[AlreadyPackedSchema] = []


class OrderToUserSchema(BaseModel):
    data: OrderDataToUser
    status: str = 'ok'
