from typing import Union

from sqlalchemy.ext.asyncio import AsyncSession

from app.api.exceptions import (InvalidHonestSignError, InvalidImeiError,
                                NeedToClosePackageError, NoActiveOrderError,
                                NoActivePackageError, NoBarcodeError)
from app.api.services.base import BaseService
from app.api.services.package import package_service
from app.core.constants import NONPACK_CARGOTYPES
from app.crud.barcode import barcode_crud
from app.crud.order import order_crud
from app.crud.pack_variation import pack_variation_crud
from app.crud.package import package_crud
from app.models.barcode_sku import BarcodeSKU
from app.models.cartontype import Cartontype
from app.models.order import Order
from app.models.package import Package
from app.schemas.barcode import BarcodeInfoSchema
from app.schemas.base import BaseOutputSchema


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
        if not order:
            raise NoActiveOrderError()
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
                barcode=barcode_obj,
                active_package=active_package,
                order=order,
                session=session
        )

    async def handle_sku_barcode(
        self,
        barcode: BarcodeSKU,
        active_package: Package,
        order: Order,
        session: AsyncSession,
    ) -> BarcodeInfoSchema:
        pack_variation = (
            await pack_variation_crud.get_active_pack_variation(
                orderkey=order.orderkey,
                session=session
            )
        )
        pack_variation_id = pack_variation.id
        product = await self.crud.get_product_by_sku(
            barcode.sku,
            session
        )
        nonpack = False
        for cargotype in product.cargotypes:
            if cargotype.cargotype_tag in NONPACK_CARGOTYPES:
                if active_package:
                    raise NeedToClosePackageError()
                await barcode_crud.handle_nonpack_product(
                    cargotype_tag=cargotype.cargotype_tag,
                    packing_variation_id=pack_variation_id,
                    barcode=barcode,
                    session=session
                )
                nonpack = True
                break
        if not active_package and not nonpack:
            raise NoActivePackageError()
        if not nonpack:
            await package_crud.add_package_product(
                orderkey=order.orderkey,
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

    async def handle_imei(
        self,
        barcode: str,
        imei: str,
        session: AsyncSession,
    ) -> BaseOutputSchema:
        await self.check_imei_mock(
            imei=imei,
            session=session
        )
        return await self.add_imei(
            barcode=barcode,
            imei=imei,
            session=session
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

    async def handle_honest_sign(
        self,
        barcode: str,
        honest_sign: str,
        session: AsyncSession,
    ) -> BaseOutputSchema:
        await self.check_honest_sign_mock(
            honest_sign=honest_sign,
            session=session
        )
        return await self.add_honest_sign(
            barcode=barcode,
            honest_sign=honest_sign,
            session=session
        )

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

    async def check_imei_mock(
        self,
        imei: str,
        session: AsyncSession,
    ) -> None:
        if len(imei) != 15:
            raise InvalidImeiError()

    async def check_honest_sign_mock(
        self,
        honest_sign: str,
        session: AsyncSession,
    ) -> None:
        if len(honest_sign) != 13:
            raise InvalidHonestSignError()


barcode_service = BarcodeService(barcode_crud)
