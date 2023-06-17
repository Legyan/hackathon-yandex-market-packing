from typing import Optional

from pydantic import BaseModel


class UserSchema(BaseModel):
    name: str


class UserAuthPrinterSchema(BaseModel):
    user_id: int
    table_id: str
    printer_id: str


class UserInfoSchema(BaseModel):
    username: str
    user_id: int
    table_id: Optional[str] = None
    printer_id: Optional[str] = None
