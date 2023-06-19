from sqlalchemy import and_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.crud.base import CRUDBase
from app.crud.pack_variation import pack_variation_crud
from app.models.barcode_sku import BarcodeSKU, BarcodeStatusEnum
from app.models.package import Package, PackageProduct, PackageStatusEnum


class CRUDPackage(CRUDBase):
    """CRUD упаковки."""

    async def get_active_package(
            self,
            orderkey: str,
            session: AsyncSession
    ) -> Package:
        """Получение активной упаковки."""

        pack_variation = (
            await pack_variation_crud.get_active_pack_variation(
                orderkey=orderkey,
                session=session
            )
        )
        return (await session.execute(
            select(Package)
            .options(joinedload(Package.products))
            .where(
                and_(
                    Package.status == PackageStatusEnum.ACTIVE,
                    Package.packing_variation_id == pack_variation.id)
            )
        )).scalars().first()

    async def add_new_package(
        self,
        cartontype_tag: str,
        pack_variation_id: int,
        status: PackageStatusEnum,
        session: AsyncSession
    ) -> Package:
        """Добавление новой упаковки."""

        new_package = Package(
            cartontype_tag=cartontype_tag,
            packing_variation_id=pack_variation_id,
            status=status
        )
        session.add(new_package)
        await session.commit()
        await session.refresh(new_package)
        return new_package

    async def add_package_product(
            self,
            orderkey: str,
            active_package: Package,
            barcode: BarcodeSKU,
            session: AsyncSession
    ) -> PackageProduct:
        """Добавление товара в упаковку."""

        await session.refresh(barcode)
        package_product = PackageProduct(
            package_id=active_package.id,
            product_sku=barcode.sku,
            barecode_tag=barcode.barcode
        )
        barcode.status = BarcodeStatusEnum.IN_CART
        barcode.orderkey = orderkey
        session.add(barcode)
        session.add(package_product)
        await session.commit()

    async def change_product_package(
        self,
        package_product: PackageProduct,
        new_package_id: int,
        session: AsyncSession
    ) -> None:
        """Перемещение товара из одной упаковки в другую."""

        package_product.package_id = new_package_id
        session.add(package_product)

    async def close_package(
        self,
        package: Package,
        session: AsyncSession
    ) -> None:
        """Закрытие упаковки."""

        package.status = PackageStatusEnum.PACKED
        session.add(package)
        await session.commit()

    async def delete_package_product(
        self,
        barcode: str,
        session: AsyncSession
    ) -> None:
        """Удаление товара из упаковки."""

        package_product = (await session.execute(
            select(PackageProduct)
            .where(PackageProduct.barecode_tag == barcode)
        )).scalars().first()
        if package_product:
            await session.delete(package_product)
            await session.commit()


package_crud = CRUDPackage(Package)
