from app.api.services.base import BaseService
from app.crud.cartontype import cartontype_crud


class CartontypeServices(BaseService):
    pass


cartontype_service = CartontypeServices(cartontype_crud)
