from app.crud.base import CRUDBase
from app.models.product_cargotype import ProductCargotype


class CRUDProductsCargotypes(CRUDBase):
    pass


products_cargotypes_crud = CRUDProductsCargotypes(ProductCargotype)
