from sqlalchemy.ext.asyncio import AsyncSession

from app.api.exceptions import NoPrinterError
from app.crud.base import CRUDBase
from app.models.printer import Printer


class CRUDPrinter(CRUDBase):
    """CRUD принтеров."""

    async def set_user_to_printer(
        self,
        user_id: int,
        printer_id: int,
        session: AsyncSession,
    ) -> None:
        """Присвоение пользователю принтера."""

        printer = await self.get_by_attribute(
            attr_name='name',
            attr_value=printer_id,
            session=session
        )
        if not printer:
            raise NoPrinterError()
        printer.user_id = user_id
        session.add(printer)
        await session.commit()


printer_crud = CRUDPrinter(Printer)
