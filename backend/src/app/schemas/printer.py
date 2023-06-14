from pydantic import BaseModel


class PrinterSchema(BaseModel):
    printer_id: str


class PrinterToDBSchema(BaseModel):
    name: str
