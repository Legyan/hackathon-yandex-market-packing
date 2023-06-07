from pydantic import BaseModel, Extra


class Item(BaseModel):
    sku: str
    count: int

    class Config:
        extra = Extra.forbid


class OrderCreate(BaseModel):
    orderkey: str
    items: list[Item]

    class Config:
        extra = Extra.forbid


class OrderDB(BaseModel):
    orderkey: str
    status: str

    class Config:
        extra = Extra.forbid
