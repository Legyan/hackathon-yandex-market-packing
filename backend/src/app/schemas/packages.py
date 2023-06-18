from pydantic import BaseModel


class RemoveFromPackageSchema(BaseModel):
    """Схема для удаления упаковки."""

    barcodes: list[str]
