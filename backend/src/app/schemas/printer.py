from pydantic import BaseModel


class PrinterSchema(BaseModel):
    name: str
