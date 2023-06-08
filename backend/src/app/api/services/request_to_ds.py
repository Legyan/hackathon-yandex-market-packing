from fastapi import Depends, HTTPException
from httpx import AsyncClient
from sqlalchemy import select
from sqlalchemy.orm import joinedload

from app.models.order import Order
from app.schemas.order import ItemToDS, OrderToDS
from app.core.db import AsyncSessionLocal, get_async_session
from app.models.product import Product


DS_URL = 'http://127.0.0.1:8001/pack'


async def get_http_client() -> AsyncClient:
    async with AsyncClient() as client:
        yield client

{"orderId": "3e646181f6f708edd3326c1626c12d23",
 "items": [
    {"sku": "151d69e7b9dcf161e74f9475b4b1c56f", "count": 1, "size1": "5.1", "size2": "2.2", "size3": "5.3",
     "weight": "7.34", "type": ["671"]}
   ]
}



async def get_package_recommendation(
        order: Order,
        client: AsyncClient = Depends(get_http_client),
        session: AsyncSessionLocal = Depends(get_async_session),
):
    items_to_ds = []
    order = await session.execute(
        select(Order)
        .options(joinedload(Order.products))
        .where(Order.orderkey == order.orderkey)
    )
    order = order.scalars().first()
    products = order.products
    for item in products:
        product = await session.execute(
            select(Product)
            .where(Product.sku == item.sku)
        )
        product = product.scalars().first()
        item_to_ds = ItemToDS(
            sku=item.sku,
            count=item.count,
            size1=str(product.lenght),
            size2=str(product.width),
            size3=str(product.height),
            weight=str(product.weight),
            type=[product.cargotype]
        )
        items_to_ds.append(item_to_ds)
    order_to_ds = OrderToDS(orderkey=order.orderkey, items=items_to_ds)

    try:
        response = await client.post(DS_URL, json=order_to_ds)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
