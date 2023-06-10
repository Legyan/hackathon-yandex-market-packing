from fastapi import Depends, HTTPException
from httpx import AsyncClient
from sqlalchemy import select
from sqlalchemy.orm import joinedload

from app.core.db import AsyncSessionLocal, get_async_session
from app.models.order import Order
from app.models.product import Product
from app.schemas.order import ItemToDS, OrderToDS
from app.schemas.pack_variation import PackingVariationsSchema

DS_URL = 'http://127.0.0.1:8001/pack'


async def get_package_recommendation(
        orderkey: str,
        session: AsyncSessionLocal = Depends(get_async_session),
) -> PackingVariationsSchema:
    """Запрос в контейнер DS для получения рекомендаций по упаковке."""
    items_to_ds = []
    order = await session.execute(
        select(Order)
        .options(joinedload(Order.products))
        .where(Order.orderkey == orderkey)
    )
    order = order.scalars().first()

    products = order.products
    for item in products:
        product = await session.execute(
            select(Product)
            .options(joinedload(Product.cargotypes))
            .where(Product.sku == item.sku)
        )
        product = product.scalars().first()
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
            cargotypes_tags.append(cargotype.cargotypes_tag)
        item_to_ds.type = cargotypes_tags
        items_to_ds.append(item_to_ds)
    order_to_ds = OrderToDS(orderkey=order.orderkey, items=items_to_ds)

    try:
        client = AsyncClient()
        response = await client.post(DS_URL, data=order_to_ds.json())
        response.raise_for_status()
        data = response.json()
        return PackingVariationsSchema.parse_obj(data)
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail='DS container error:\n' + str(e)
        )
