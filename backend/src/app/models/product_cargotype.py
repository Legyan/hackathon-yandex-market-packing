from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.orm import relationship

from app.core.db import Base


class ProductCargotype(Base):
    """Отношение товаров к карготипам."""

    __tablename__ = 'products_cargotypes'

    sku = Column(
        String(100), ForeignKey('products.sku'), nullable=False
    )
    cargotype_tag = Column(
        String(100), ForeignKey('cargotypes.tag'), nullable=False
    )
    cargotype = relationship('Cargotype', back_populates='products')
    product = relationship('Product', back_populates='cargotypes')
