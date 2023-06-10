from pydantic import BaseModel


class CargotypeSchema(BaseModel):
    tag: str
    name: str
