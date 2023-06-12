from sqlalchemy.ext.asyncio import AsyncSession

from app.api.services.base import BaseService
from app.api.services.cartontype import cartontype_service
from app.crud.barcode import barcode_crud
from app.models.barcode_sku import BarcodeSKU
from app.models.cartontype import Cartontype
from app.schemas.barcode import BarcodeInfoSchema


class BarcodeService(BaseService):
    """Сервис для работы со штрихкодами."""

    async def handle_barcode(
        self,
        user_id: int,
        barcode: str,
        session: AsyncSession,
    ) -> BarcodeInfoSchema:
        barcode_obj = await self.crud.detect_barcode_type(
            barcode,
            session,
        )
        if isinstance(barcode_obj, Cartontype):
            return await cartontype_service.handle_barcode_cartontype(
                barcode_obj,
                session
            )
        return await self.handle_sku_barcode(
                barcode_obj,
                session
        )

    async def handle_sku_barcode(
        self,
        barcode: BarcodeSKU,
        session: AsyncSession,
    ) -> BarcodeInfoSchema:
        product = await self.crud.get_product_by_sku(
            barcode.sku,
            session
        )
        return BarcodeInfoSchema(
            status='ok',
            type='goods',
            info=barcode.sku,
            imei=product.need_imei,
            honest_sign=product.need_honest_sign
        )


barcode_service = BarcodeService(barcode_crud)
