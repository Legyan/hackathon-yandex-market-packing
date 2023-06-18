from app.crud.base import CRUDBase
from app.models.cartontype import Cartontype


class CRUDCartontype(CRUDBase):
    """CRUD типов коробки."""

    pass


cartontype_crud = CRUDCartontype(Cartontype)
