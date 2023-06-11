from typing import Union

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.exceptions import NoBarcodeError
from app.crud.base import CRUDBase
from app.models.barcode_sku import BarcodeSKU
from app.models.cartontype import Cartontype
from app.models.product import Product


class CRUDBarcode(CRUDBase):
    async def detect_barcode_type(
        self,
        barcode: str,
        session: AsyncSession,
    ) -> Union[BarcodeSKU, Cartontype]:
        cartontype = (await session.execute(
                select(Cartontype).where(Cartontype.tag == barcode)
            )).scalars().first()
        if cartontype:
            return cartontype
        barcode_sku = (await session.execute(
                select(BarcodeSKU).where(BarcodeSKU.barcode == barcode)
            )).scalars().first()
        if barcode_sku:
            return barcode_sku
        raise NoBarcodeError()

    async def get_product_by_sku(
        self,
        sku: str,
        session: AsyncSession,
    ) -> Product:
        product = (await session.execute(
                select(Product).where(Product.sku == sku)
            )).scalars().first()
        return product


barcode_crud = CRUDBarcode(BarcodeSKU)
