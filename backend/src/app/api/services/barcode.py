from typing import Union

from sqlalchemy.ext.asyncio import AsyncSession

from app.api.exceptions import NoBarcodeError, NoActivePackageError
from app.api.services.base import BaseService
from app.api.services.package import package_service
from app.crud.barcode import barcode_crud
from app.crud.order import order_crud
from app.crud.package import package_crud
from app.models.barcode_sku import BarcodeSKU
from app.models.cartontype import Cartontype
from app.models.package import Package
from app.schemas.base import BaseOutputSchema
from app.schemas.barcode import BarcodeInfoSchema


class BarcodeService(BaseService):
    """Сервис для работы со штрихкодами."""

    async def handle_barcode(
        self,
        user_id: int,
        barcode: str,
        session: AsyncSession,
    ) -> BarcodeInfoSchema:
        barcode_obj: Union[BarcodeSKU, Cartontype] = (
            await self.crud.detect_barcode_type(
                barcode,
                session,
            )
        )
        order = await order_crud.get_order_by_user_id(user_id, session)
        active_package = await package_service.get_active_package(
            orderkey=order.orderkey,
            session=session
        )
        if isinstance(barcode_obj, Cartontype):
            cartontype_tag = barcode_obj.tag
            if active_package:
                await package_service.change_active_package(
                    active_package=active_package,
                    cartontype=barcode_obj.tag,
                    order=order,
                    session=session
                )
            else:
                await package_service.add_new_package(
                    cartontype_tag=cartontype_tag,
                    order=order,
                    session=session
                )
            return BarcodeInfoSchema(
                status='ok',
                type='carton',
                info=cartontype_tag,
                imei=False,
                honest_sign=False
            )
        return await self.handle_sku_barcode(
                barcode_obj,
                active_package,
                session
        )

    async def handle_sku_barcode(
        self,
        barcode: BarcodeSKU,
        active_package: Package,
        session: AsyncSession,
    ) -> BarcodeInfoSchema:
        if not active_package:
            raise NoActivePackageError()
        packing_variation_id = active_package.packing_variation_id
        product = await self.crud.get_product_by_sku(
            barcode.sku,
            session
        )
        nonpack = False
        for cargotype in product.cargotypes:
            if cargotype.cargotype_tag in ['340', '360']:
                await barcode_crud.handle_nonpack_product(
                    cargotype_tag=cargotype.cargotype_tag,
                    packing_variation_id=packing_variation_id,
                    barcode=barcode,
                    session=session
                )
                nonpack = True
        if not nonpack:
            await package_crud.add_package_product(
                active_package=active_package,
                barcode=barcode,
                session=session
            )
        await session.refresh(barcode)
        await session.refresh(product)
        return BarcodeInfoSchema(
            status='ok',
            type='goods',
            info=barcode.sku,
            imei=product.need_imei,
            honest_sign=product.need_honest_sign
        )

    async def add_imei(
        self,
        barcode: str,
        imei: str,
        session: AsyncSession,
    ) -> BaseOutputSchema:
        barcode_sku = await self.crud.get_barcode(
            barcode=barcode,
            session=session
        )
        if not barcode_sku:
            raise NoBarcodeError()
        await self.crud.add_imei(
            barcode=barcode,
            imei=imei,
            session=session
        )
        return BaseOutputSchema()

    async def add_honest_sign(
        self,
        barcode: str,
        honest_sign: str,
        session: AsyncSession,
    ) -> BaseOutputSchema:
        barcode_sku = await self.crud.get_barcode(
            barcode=barcode,
            session=session
        )
        if not barcode_sku:
            raise NoBarcodeError()
        await self.crud.add_honest_sign(
            barcode=barcode,
            honest_sign=honest_sign,
            session=session
        )
        return BaseOutputSchema()


barcode_service = BarcodeService(barcode_crud)
