from pydantic import BaseModel, Extra


class PackingVariationSchema(BaseModel):
    cartontype: str
    goods: list[str]

    class Config:
        extra = Extra.forbid


class PackingVariationsSchema(BaseModel):
    orderkey: str
    package: list[PackingVariationSchema]
    status: str

    class Config:
        extra = Extra.forbid
