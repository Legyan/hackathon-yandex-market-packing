from pydantic import BaseModel


class BaseOutputSchema(BaseModel):
    """Базовая схема для вывода статуса."""

    status: str = 'ok'


class BaseSuccessSchema(BaseModel):
    """Базовая схема успешного ответа."""

    success: bool = True
