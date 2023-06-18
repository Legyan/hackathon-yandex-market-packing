from pydantic import BaseModel, Extra


class PackageSchema(BaseModel):
    """Схема упаковки."""

    cartontype: str
    goods: list[str]

    class Config:
        extra = Extra.forbid


class PackingVariationsSchema(BaseModel):
    """Схема вариантов упаковки."""

    orderkey: str
    recommendations: list[list[PackageSchema]]
    status: str
