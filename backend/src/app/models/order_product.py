from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.core.db import Base


class OrderProduct(Base):
    """Модель товара в заказе."""

    __tablename__ = 'order_products'

    orderkey = Column(
        String(50), ForeignKey('orders.orderkey'), nullable=False
    )
    sku = Column(
        String(100), ForeignKey('products.sku'), nullable=False
    )
    count = Column(Integer, nullable=False)
    order = relationship('Order', back_populates='products')
    product = relationship('Product', back_populates='orders')

    def to_dict(self):
        return {
            'orderkey': self.orderkey,
            'sku': self.sku,
            'count': self.count,
        }
