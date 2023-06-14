from typing import Union

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.api.exceptions import NoBarcodeError
from app.crud.base import CRUDBase
from app.crud.package import package_crud
from app.models.barcode_sku import BarcodeSKU
from app.models.cartontype import Cartontype
from app.models.package import PackageStatusEnum
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
        return (
            await session.execute(
                select(Product)
                .options(joinedload(Product.cargotypes))
                .where(Product.sku == sku)
            )
        ).scalars().first()

    async def handle_nonpack_product(
        self,
        cargotype_tag: str,
        packing_variation_id: int,
        barcode: BarcodeSKU,
        session: AsyncSession
    ) -> None:
        if cargotype_tag == '360':
            cartontype = 'STRETCH'
        else:
            cartontype = 'NONPACK'
        new_package = await package_crud.add_new_package(
            cartontype_tag=cartontype,
            pack_variation_id=packing_variation_id,
            status=PackageStatusEnum.PACKED,
            session=session
        )
        await package_crud.add_package_product(
            active_package=new_package,
            barcode=barcode,
            session=session
        )


barcode_crud = CRUDBarcode(BarcodeSKU)
