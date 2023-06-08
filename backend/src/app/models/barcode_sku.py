from enum import Enum as PyEnum

from sqlalchemy import Enum, Column, ForeignKey, String
from sqlalchemy.orm import relationship

from app.core.db import Base


class BarcodeStatusEnum(PyEnum):
    ALLOWED = 'allowed'
    IN_CART = 'in_cart'
    NOT_ALLOWED = 'not_allowed'


class BarcodeSKU(Base):
    __tablename__ = 'barcode_sku'

    barcode = Column(String(500), unique=True, nullable=False)
    sku = Column(
        String(100), ForeignKey('products.sku'), nullable=False
    )
    status = Column(Enum(BarcodeStatusEnum), nullable=False)
    product = relationship('Product', back_populates='barcodes')
