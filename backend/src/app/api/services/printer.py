from sqlalchemy.ext.asyncio import AsyncSession

from app.api.services.base import BaseService
from app.crud.printer import printer_crud


class PrinterService(BaseService):
    """Сервис для работы c принтерами."""

    async def set_user_to_printer(
        self,
        user_id: str,
        printer_id: str,
        session: AsyncSession,
    ) -> None:
        await self.crud.set_user_to_printer(
            user_id,
            printer_id,
            session
        )


printer_service = PrinterService(printer_crud)
