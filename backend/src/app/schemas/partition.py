from pydantic import BaseModel


class PartitionSchema(BaseModel):
    name: str
