from enum import Enum as PyEnum

from sqlalchemy import Boolean, DateTime, Enum, Column, ForeignKey, Integer, String, func
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
    packer_user_id = Column(Integer, ForeignKey('users.id'))
    updated_at = Column(
        DateTime, server_default=func.now(), onupdate=func.now()
    )

    products = relationship('OrderProduct', back_populates='order')
    pack_variations = relationship('PackingVariation', back_populates='order')
    barcodes = relationship('BarcodeSKU', back_populates='order')

    def to_dict(self):
        return {
            'orderkey': self.orderkey,
            'status': self.status.value,
        }
