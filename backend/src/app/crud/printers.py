from app.crud.base import CRUDBase
from app.models.printer import Printer


class CRUDPrinter(CRUDBase):
    pass


printer_crud = CRUDPrinter(Printer)
