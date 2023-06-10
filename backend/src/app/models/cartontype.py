from sqlalchemy import Column, Float, String

from app.core.db import Base


class Cartontype(Base):
    __tablename__ = 'cartontypes'

    tag = Column(String(10), unique=True, nullable=False)
    length = Column(Float)
    width = Column(Float)
    height = Column(Float)
