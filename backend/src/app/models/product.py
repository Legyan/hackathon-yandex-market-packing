from sqlalchemy import Boolean, Column, Float, Integer, String, Text
from sqlalchemy.orm import relationship

from app.core.db import Base


class Product(Base):
    __tablename__ = 'products'

    sku = Column(String(100), unique=True, nullable=False)
    title = Column(String(200), unique=True, nullable=False)
    description = Column(Text)
    image = Column(Text)
    need_imei = Column(Boolean, nullable=False, default=False)
    need_honest_sign = Column(Boolean, nullable=False, default=False)
    weight = Column(Float)
    length = Column(Float)
    width = Column(Float)
    height = Column(Float)
    price = Column(Integer)
    count = Column(Integer, nullable=False, default=0)
    cargotypes = relationship('ProductCargotype', back_populates='product')
    orders = relationship('OrderProduct', back_populates='product')
    barcodes = relationship('BarcodeSKU', back_populates='product')
