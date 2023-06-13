from enum import Enum as PyEnum

from sqlalchemy import Column, Enum, ForeignKey, String
from sqlalchemy.orm import relationship

from app.core.db import Base


class BarcodeStatusEnum(PyEnum):
    ALLOWED = 'allowed'
    IN_CART = 'in_cart'
    NOT_ALLOWED = 'not_allowed'


class BarcodeSKU(Base):
    """Модель штрихкода конкретного товара."""
    __tablename__ = 'barcode_sku'

    barcode = Column(String(500), unique=True, nullable=False)
    sku = Column(
        String(100), ForeignKey('products.sku'), nullable=False
    )
    status = Column(Enum(BarcodeStatusEnum), nullable=False)
    orderkey = Column(String(100), ForeignKey('orders.orderkey'))

    order = relationship('Order', back_populates='barcodes')
    package = relationship('PackageProduct', back_populates='barcode')
    product = relationship('Product', back_populates='barcodes')
