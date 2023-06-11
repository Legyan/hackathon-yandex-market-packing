from app.crud.base import CRUDBase


class BaseService:
    """Базовый сервис."""

    def __init__(self, crud: CRUDBase) -> None:
        self.crud = crud
