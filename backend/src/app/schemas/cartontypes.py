from pydantic import BaseModel


class CartontypeSchema(BaseModel):
    tag: str
    length: float
    width: float
    height: float
