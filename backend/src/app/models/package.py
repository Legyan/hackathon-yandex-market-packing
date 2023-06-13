from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.core.db import Base


class Package(Base):
    """Модель упаковки (коробки или пакета)"""
    __tablename__ = 'packages'

    cartontype_tag = Column(
        String(100), ForeignKey('cartontypes.tag'), nullable=False
    )
    packing_variation_id = Column(
        Integer, ForeignKey('pack_variation.id'), nullable=False
    )
    is_packaged = Column(Boolean, nullable=False, default=False)
    products = relationship('PackageProduct', back_populates='package')
    pack_variation = relationship(
        'PackingVariation', back_populates='packages'
    )


class PackageProduct(Base):
    """Отношение упаковки (коробки или пакета) к товарам для упаковки в неё."""
    __tablename__ = 'package_products'

    package_id = Column(Integer, ForeignKey('packages.id'))
    product_sku = Column(String(100), ForeignKey('products.sku'))
    barecode_tag = Column(
        String(500), ForeignKey('barcode_sku.barcode')
    )
    package = relationship('Package', back_populates='products')
    product = relationship('Product')
    barcode = relationship('BarcodeSKU', back_populates='package')
