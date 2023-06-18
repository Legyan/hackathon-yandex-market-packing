from pydantic import BaseModel


class ProductsCargotypesSchema(BaseModel):
    sku: str
    cargotype_tag: str
