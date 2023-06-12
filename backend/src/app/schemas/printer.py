from pydantic import BaseModel


class PrinterSchema(BaseModel):
    printer_id: int


class PrinterToDBSchema(BaseModel):
    name: str
