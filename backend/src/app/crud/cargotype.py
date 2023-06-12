from app.crud.base import CRUDBase
from app.models.cargotype import Cargotype


class CRUDCargotype(CRUDBase):
    pass


cargotype_crud = CRUDCargotype(Cargotype)
