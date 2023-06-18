from pydantic import BaseModel


class BaseOutputSchema(BaseModel):
    status: str = 'ok'

class BaseSuccessSchema(BaseModel):
    success: bool = True
