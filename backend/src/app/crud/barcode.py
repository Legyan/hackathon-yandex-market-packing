from typing import Union

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.api.exceptions import (AlreadyHandledBarcodeError,
                                AlreadyHaveHonestSignError,
                                AlreadyHaveImeiError, NoBarcodeError)
from app.core.constants import NONPACK_TYPES
from app.crud.base import CRUDBase
from app.crud.package import package_crud
from app.models.barcode_sku import BarcodeSKU, BarcodeStatusEnum
from app.models.cartontype import Cartontype
from app.models.honest_sign import HonestSign
from app.models.imei import Imei
from app.models.package import PackageStatusEnum
from app.models.product import Product


class CRUDBarcode(CRUDBase):
    """CRUD штрих-кодов."""

    async def detect_barcode_type(
        self,
        barcode: str,
        session: AsyncSession,
    ) -> Union[BarcodeSKU, Cartontype]:
        """Определяет тип штрихкода (товар/корбка)
        и возвращает объект, которому принадлежит штрихкод."""

        cartontype = (await session.execute(
                select(Cartontype).where(Cartontype.tag == barcode)
            )).scalars().first()
        if cartontype:
            return cartontype
        barcode_sku = await self.get_by_attribute(
            attr_name='barcode',
            attr_value=barcode,
            session=session
        )
        if barcode_sku.status != BarcodeStatusEnum.ALLOWED:
            raise AlreadyHandledBarcodeError()
        if barcode_sku:
            return barcode_sku
        raise NoBarcodeError()

    async def get_product_by_sku(
        self,
        sku: str,
        session: AsyncSession,
    ) -> Product:
        """Получение продукта с карготипами."""

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
        """Обработка NONPAC товара."""

        cartontype = NONPACK_TYPES[cargotype_tag]
        new_package = await package_crud.add_new_package(
            cartontype_tag=cartontype,
            pack_variation_id=packing_variation_id,
            status=PackageStatusEnum.ACTIVE,
            session=session
        )
        await package_crud.add_package_product(
            active_package=new_package,
            barcode=barcode,
            session=session
        )

    async def add_imei(
        self,
        barcode: str,
        imei: str,
        session: AsyncSession
    ) -> None:
        """Запись IMEI товара в базу данных."""

        already_imei = (await session.execute(
                select(Imei).where(Imei.barcode == barcode)
            )).scalars().first()
        if already_imei:
            raise AlreadyHaveImeiError()
        imei = Imei(
            barcode=barcode,
            imei=imei
        )
        session.add(imei)
        await session.commit()
        return imei

    async def add_honest_sign(
        self,
        barcode: str,
        honest_sign: str,
        session: AsyncSession
    ) -> None:
        """Запись "Честного знака" товара в базу данных."""

        already_honest_sign = (await session.execute(
                select(HonestSign).where(HonestSign.barcode == barcode)
            )).scalars().first()
        if already_honest_sign:
            raise AlreadyHaveHonestSignError()
        honest_sign = HonestSign(
            barcode=barcode,
            honest_sign=honest_sign
        )
        session.add(honest_sign)
        await session.commit()
        return honest_sign

    async def set_barcode_status(
        self,
        barcode: str,
        status: BarcodeStatusEnum,
        session: AsyncSession
    ) -> None:
        """Присваивание статуса штрих-коду."""

        barcode = await barcode_crud.get_by_attribute(
            attr_name='barcode',
            attr_value=barcode,
            session=session
        )
        barcode.status = status
        session.add(barcode)
        await session.commit()


barcode_crud = CRUDBarcode(BarcodeSKU)
