from pydantic import BaseModel


class PartitionSchema(BaseModel):
    """Схема ячейки."""

    name: str
