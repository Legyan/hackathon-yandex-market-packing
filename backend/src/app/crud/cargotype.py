from app.crud.base import CRUDBase
from app.models.cargotype import Cargotype


class CRUDCargotype(CRUDBase):
    """CRUD карготипов товара."""

    pass


cargotype_crud = CRUDCargotype(Cargotype)
