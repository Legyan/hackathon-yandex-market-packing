from fastapi import Depends, HTTPException
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.services.base import BaseService
from app.core.constants import DS_URL
from app.core.db import AsyncSessionLocal, get_async_session
from app.crud.order import order_crud
from app.crud.pack_variation import pack_variation_crud
from app.crud.product import product_crud
from app.schemas.order import ItemToDS, OrderToDS
from app.schemas.pack_variation import PackingVariationsSchema


class PackingVariationService(BaseService):
    """Сервис для работы с вариантами упаковки."""

    async def get_package_recommendation(
            self,
            orderkey: str,
            session: AsyncSessionLocal = Depends(get_async_session),
    ) -> PackingVariationsSchema:
        """Запрос в контейнер DS для получения рекомендаций по упаковке."""

        items_to_ds = []
        order = await order_crud.get_order_with_products(
            orderkey=orderkey,
            session=session
        )

        for item in order.products:
            product = await product_crud.get_product_with_cargotypes(
                sku=item.sku,
                session=session
            )
            item_to_ds = ItemToDS(
                sku=item.sku,
                count=item.count,
                size1=str(product.length),
                size2=str(product.width),
                size3=str(product.height),
                weight=str(product.weight),
                type=[]
            )
            cargotypes = product.cargotypes
            cargotypes_tags = []
            for cargotype in cargotypes:
                cargotypes_tags.append(cargotype.cargotype_tag)
            item_to_ds.type = cargotypes_tags
            items_to_ds.append(item_to_ds)
        order_to_ds = OrderToDS(orderId=order.orderkey, items=items_to_ds)
        try:
            client = AsyncClient()
            response = await client.post(
                url=DS_URL,
                data=order_to_ds.json()
            )
            response.raise_for_status()
            data = response.json()
            return PackingVariationsSchema.parse_obj(data)
        except Exception as e:
            raise HTTPException(
                status_code=400,
                detail='DS container error: ' + str(e) + DS_URL
            )

    async def write_pack_variations_to_db(
        self,
        packing_variations: PackingVariationsSchema,
        session: AsyncSession,
    ) -> None:
        """Запись вариантов упаковки в базу данных."""

        await self.crud.write_pack_variations_to_db(
            packing_variations=packing_variations,
            session=session
        )

    async def add_active_pack_variation(
            self,
            orderkey: str,
            session: AsyncSession
    ) -> None:
        """Добавление варианта упаковки."""

        await self.crud.add_active_pack_variation(
            orderkey=orderkey,
            session=session
        )


pack_variation_service = PackingVariationService(pack_variation_crud)
