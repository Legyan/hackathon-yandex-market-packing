from pydantic import BaseModel


class UserSchema(BaseModel):
    name: str


class UserAuthPrinterSchema(BaseModel):
    user_id: int
    table_id: str
    printer_id: str
