from pydantic import BaseModel


class BaseOutputSchema(BaseModel):
    status: str = 'ok'
