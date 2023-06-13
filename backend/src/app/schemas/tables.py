from pydantic import BaseModel


class TableSchema(BaseModel):
    name: str
