from app.crud.base import CRUDBase
from app.models.partition import Partition


class CRUDPartition(CRUDBase):
    pass


partition_crud = CRUDPartition(Partition)
