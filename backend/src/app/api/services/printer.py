from sqlalchemy.ext.asyncio import AsyncSession

from app.api.exceptions import (AlreadyHavePrinterError, NotRegiserTableError,
                                PrinterIsBusyError)
from app.api.services.base import BaseService
from app.crud.printer import printer_crud
from app.crud.table import table_crud
from app.schemas.printer import AuthOutputSchema
from app.schemas.user import UserAuthPrinterSchema


class PrinterService(BaseService):
    """Сервис для работы c принтерами."""

    async def set_user_to_printer(
        self,
        user_id: str,
        printer_id: str,
        session: AsyncSession,
    ) -> AuthOutputSchema:
        table = await table_crud.get_table_by_user(
            user_id=user_id,
            session=session
        )
        if not table:
            raise NotRegiserTableError()
        table_id = str(table.id)
        user_printer = await self.crud.get_by_attribute(
            attr_name="user_id",
            attr_value=user_id,
            session=session
        )
        if user_printer and user_printer.id != int(printer_id):
            raise AlreadyHavePrinterError(user_printer.id)
        printer = await self.crud.get(
            int(printer_id),
            session=session
        )
        if printer.user_id and printer.user_id != user_id:
            raise PrinterIsBusyError()
        await self.crud.set_user_to_printer(
            user_id,
            printer_id,
            session
        )
        user = UserAuthPrinterSchema(
            user_id=user_id,
            printer_id=printer_id,
            table_id=table_id)
        return AuthOutputSchema(
            success=True,
            user=user
        )


printer_service = PrinterService(printer_crud)
