from app.crud.base import CRUDBase
from app.models.cartontype import Cartontype


class CRUDCartontype(CRUDBase):
    pass


cartontype_crud = CRUDCartontype(Cartontype)
