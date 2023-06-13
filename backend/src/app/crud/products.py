from app.crud.base import CRUDBase
from app.models.product import Product


class CRUDProduct(CRUDBase):
    pass


product_crud = CRUDProduct(Product)
