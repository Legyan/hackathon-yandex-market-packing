from sqlalchemy import and_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.crud.base import CRUDBase
from app.crud.pack_variation import pack_variation_crud
from app.models.barcode_sku import BarcodeSKU
from app.models.package import Package, PackageProduct, PackageStatusEnum


class CRUDPackage(CRUDBase):
    async def get_active_package(
            self,
            orderkey: str,
            session: AsyncSession
    ) -> Package:
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
            active_package: Package,
            barcode: BarcodeSKU,
            session: AsyncSession
    ) -> PackageProduct:
        package_product = PackageProduct(
            package_id=active_package.id,
            product_sku=barcode.sku,
            barecode_tag=barcode.barcode
        )
        session.add(package_product)
        await session.commit()

    async def change_product_package(
        self,
        package_product: PackageProduct,
        new_package_id: int,
        session: AsyncSession
    ) -> None:
        package_product.package_id = new_package_id
        session.add(package_product)



package_crud = CRUDPackage(Package)
