from sqlalchemy.ext.asyncio import AsyncSession

from app.api.services.base import BaseService
from app.crud.cartontype import cartontype_crud
from app.models.cartontype import Cartontype
from app.schemas.barcode import BarcodeInfoSchema


class CartontypeServices(BaseService):
    async def handle_barcode_cartontype(
        self,
        cartontype: Cartontype,
        session: AsyncSession,
    ) -> BarcodeInfoSchema:
        return BarcodeInfoSchema(
           status='ok',
           type='carton',
           info=cartontype.tag,
           imei=False,
           honest_sign=False
        )


cartontype_service = CartontypeServices(cartontype_crud)
