from pydantic import BaseModel


class RegisterTableSchema(BaseModel):
    user_id: int
    table_id: str


class TokenSchema(BaseModel):
    token: str
