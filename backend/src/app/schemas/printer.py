from pydantic import BaseModel

from app.schemas.user import UserAuthPrinterSchema


class PrinterSchema(BaseModel):
    printer_id: str


class PrinterToDBSchema(BaseModel):
    name: str


class AuthOutputSchema(BaseModel):
    success: bool
    user: UserAuthPrinterSchema
