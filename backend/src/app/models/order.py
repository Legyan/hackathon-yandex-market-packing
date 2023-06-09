from enum import Enum as PyEnum

from sqlalchemy import Boolean, Enum, Column, String
from sqlalchemy.orm import relationship

from app.core.db import Base


class OrderStatusEnum(PyEnum):
    FORMING = 'forming'
    COLLECT = 'collect'
    WAITING = 'waiting'
    PROPOSED = 'proposed'
    COLLECTED = 'collected'


class Order(Base):
    __tablename__ = 'orders'

    orderkey = Column(String(50), unique=True, nullable=False)
    status = Column(Enum(OrderStatusEnum), nullable=False)
    is_packaged = Column(Boolean, nullable=False, default=False)

    products = relationship('OrderProduct', back_populates='order')
    pack_variations = relationship('PackingVariation', back_populates='order')
    barcodes = relationship('BarcodeSKU', back_populates='order')

    def to_dict(self):
        return {
            'orderkey': self.orderkey,
            'status': self.status.value,
        }
