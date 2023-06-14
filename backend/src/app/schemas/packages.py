from pydantic import BaseModel


class RemoveFromPackageSchema(BaseModel):
    barcodes: list[str]
