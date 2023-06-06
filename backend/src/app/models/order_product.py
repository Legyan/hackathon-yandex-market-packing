from sqlalchemy import Column, ForeignKey, Integer, String

from app.core.db import Base


class OrderProduct(Base):
    __tablename__ = 'order_products'

    orderkey = Column(
        String(50), ForeignKey('orders.orderkey'), nullable=False
    )
    product_sku = Column(
        String(100), ForeignKey('products.sku'), nullable=False
    )
    count = Column(Integer, nullable=False)
