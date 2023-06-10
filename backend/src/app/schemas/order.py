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

    class Config:
        extra = Extra.forbid


class OrderCreate(BaseModel):
    orderkey: str
    items: list[ItemBase]

    class Config:
        extra = Extra.forbid


class OrderDB(BaseModel):
    orderkey: str
    status: str

    class Config:
        extra = Extra.forbid


class OrderToDS(BaseModel):
    orderkey: str
    items: list[ItemToDS]
