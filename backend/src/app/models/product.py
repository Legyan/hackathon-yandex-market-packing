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
    cargotype = Column(String(10), unique=True, nullable=False)
    weight = Column(Float)
    lenght = Column(Float)
    width = Column(Float)
    height = Column(Float)
    price = Column(Integer)
    count = Column(Integer, nullable=False, default=0)
    orders = relationship('OrderProduct', back_populates='product')
