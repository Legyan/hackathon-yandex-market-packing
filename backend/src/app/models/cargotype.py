from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from app.core.db import Base


class Cargotype(Base):
    __tablename__ = 'cargotypes'

    tag = Column(String(10), unique=True, nullable=False)
    name = Column(String(100), unique=True)
    products = relationship('ProductCargotype', back_populates='cargotype')
