from sqlalchemy import Boolean, Column, Integer, ForeignKey, String
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
        'PackingVariationPackages', back_populates='pack_variation'
    )


class PackingVariationPackages(Base):
    """Отношение варианта упаковки заказа к конкретным упаковкам
    (коробкам или пакетам)"""
    __tablename__ = 'pack_variation_package'

    package_variation_id = Column(
        Integer, ForeignKey('pack_variation.id'), primary_key=True
    )
    package_id = Column(Integer, ForeignKey('packages.id'), primary_key=True)

    pack_variation = relationship(
        'PackingVariation', back_populates='packages'
    )
    package = relationship(
        'Package', back_populates='pack_variation'
    )
