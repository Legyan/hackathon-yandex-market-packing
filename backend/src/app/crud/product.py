from sqlalchemy import and_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.crud.base import CRUDBase
from app.models.order_product import OrderProduct
from app.models.product import Product


class CRUDProduct(CRUDBase):

    async def get_product_with_cargotypes(
            self,
            sku: str,
            session: AsyncSession
    ) -> Product:
        return (await session.execute(
                select(Product)
                .options(joinedload(Product.cargotypes))
                .where(Product.sku == sku)
                )).scalars().first()

    async def get_order_products_count(
            self,
            orderkey: str,
            sku: str,
            session: AsyncSession
    ) -> int:
        products = (await session.execute(
            select(OrderProduct)
            .where(
                and_(OrderProduct.sku == sku,
                     OrderProduct.orderkey == orderkey)
            )
        )).scalars().first()
        return products.count


product_crud = CRUDProduct(Product)
