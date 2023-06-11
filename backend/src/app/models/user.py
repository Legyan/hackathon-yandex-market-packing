from sqlalchemy import Column, DateTime, String, func
from sqlalchemy.orm import relationship

from app.core.db import Base


class User(Base):
    __tablename__ = 'users'

    name = Column(String(100), unique=True, nullable=False)
    updated_at = Column(DateTime, onupdate=func.now())

    orders = relationship('Order')
