from pydantic import BaseModel


class CargotypeSchema(BaseModel):
    """Схема карготипов."""

    tag: str
    name: str
