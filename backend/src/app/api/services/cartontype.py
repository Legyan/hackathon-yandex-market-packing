from app.api.services.base import BaseService
from app.crud.cartontype import cartontype_crud


class CartontypeServices(BaseService):
    """Сервис для типами коробок."""

    pass


cartontype_service = CartontypeServices(cartontype_crud)
