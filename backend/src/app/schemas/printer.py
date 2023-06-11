from pydantic import BaseModel


class PrinterSchema(BaseModel):
    printer_id: int
