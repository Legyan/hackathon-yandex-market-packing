from pydantic import BaseModel


class ProductsCargotypesSchema(BaseModel):
    """Схема для добавление тестовых карготипов
    товаров в базу данных."""

    sku: str
    cargotype_tag: str
