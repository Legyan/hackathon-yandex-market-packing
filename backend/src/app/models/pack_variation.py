from sqlalchemy import Boolean, Column, ForeignKey, String
from sqlalchemy.orm import relationship

from app.core.db import Base


class PackingVariation(Base):
    """Модель вариантов упаковки заказа."""
    __tablename__ = 'pack_variation'

    orderkey = Column(
        String(100), ForeignKey('orders.orderkey'), nullable=False
    )
    selected = Column(Boolean)
    is_recommendation = Column(Boolean, nullable=False, default=False)

    order = relationship('Order', back_populates='pack_variations')
    packages = relationship(
        'Package', back_populates='pack_variation'
    )
