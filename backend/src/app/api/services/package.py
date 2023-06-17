from sqlalchemy.ext.asyncio import AsyncSession

from app.api.exceptions import NoActivePackageError
from app.api.services.base import BaseService
from app.crud.barcode import barcode_crud
from app.crud.order import order_crud
from app.crud.pack_variation import pack_variation_crud
from app.crud.package import package_crud
from app.models.barcode_sku import BarcodeStatusEnum
from app.models.order import Order
from app.models.package import Package, PackageStatusEnum
from app.schemas.base import BaseOutputSchema


class PackageService(BaseService):
    """Сервис для работы с упаковками (коробками и пакетами)."""
    async def get_active_package(
        self,
        orderkey: str,
        session: AsyncSession
    ) -> Package:
        return await self.crud.get_active_package(
            orderkey=orderkey,
            session=session
        )

    async def change_active_package(
        self,
        active_package: Package,
        cartontype: str,
        order: Order,
        session: AsyncSession
    ) -> None:
        new_package = await self.add_new_package(
            cartontype_tag=cartontype,
            order=order,
            session=session
        )
        await session.refresh(active_package)
        for product in active_package.products:
            await self.crud.change_product_package(
                package_product=product,
                new_package_id=new_package.id,
                session=session
            )
        await session.commit()
        await session.refresh(active_package)
        await session.delete(active_package)
        await session.commit()

    async def add_new_package(
        self,
        cartontype_tag: str,
        order: Order,
        session: AsyncSession
    ) -> Package:
        pack_variation = await pack_variation_crud.get_active_pack_variation(
            orderkey=order.orderkey,
            session=session
        )
        return await self.crud.add_new_package(
            cartontype_tag=cartontype_tag,
            pack_variation_id=pack_variation.id,
            status=PackageStatusEnum.ACTIVE,
            session=session
        )

    async def close_package(
        self,
        user_id: int,
        session: AsyncSession
    ) -> BaseOutputSchema:
        order = await order_crud.get_order_by_user_id(user_id, session)
        active_package = await package_service.get_active_package(
            orderkey=order.orderkey,
            session=session
        )
        if not active_package:
            raise NoActivePackageError()
        await self.crud.close_package(
            package=active_package,
            session=session
        )
        return BaseOutputSchema()

    async def remove_from_package(
        self,
        barcodes: list[str],
        user_id: int,
        session: AsyncSession
    ) -> BaseOutputSchema:
        for barcode in barcodes:
            await self.crud.delete_package_product(
                barcode=barcode,
                session=session
            )
            await barcode_crud.set_barcode_status(
                barcode=barcode,
                status=BarcodeStatusEnum.ALLOWED,
                session=session
            )
        return BaseOutputSchema()


package_service = PackageService(package_crud)
