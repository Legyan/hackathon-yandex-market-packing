from pydantic import BaseModel


class TableSchema(BaseModel):
    """Схема столов."""

    name: str
