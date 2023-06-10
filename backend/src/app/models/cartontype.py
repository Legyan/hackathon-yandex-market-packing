from sqlalchemy import Column, String

from app.core.db import Base


class Cartontype(Base):
    __tablename__ = 'cartontypes'

    tag = Column(String(10), unique=True, nullable=False)
    name = Column(String(100), unique=True)
