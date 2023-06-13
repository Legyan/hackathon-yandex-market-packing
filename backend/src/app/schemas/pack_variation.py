from pydantic import BaseModel, Extra


class PackageSchema(BaseModel):
    cartontype: str
    goods: list[str]

    class Config:
        extra = Extra.forbid


class PackingVariationsSchema(BaseModel):
    orderkey: str
    recommendations: list[list[PackageSchema]]
    status: str

    class Config:
        extra = Extra.forbid
