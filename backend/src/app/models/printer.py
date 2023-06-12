from sqlalchemy import Column, DateTime, Integer, ForeignKey, String, func
from sqlalchemy.orm import relationship

from app.core.db import Base


class Printer(Base):
    """Модель принтера."""
    __tablename__ = 'printers'

    name = Column(String(50), unique=True, nullable=False)
    user_id = Column(
        Integer, ForeignKey('users.id'), unique=True
    )
    updated_at = Column(DateTime, onupdate=func.now())

    user = relationship('User', back_populates='printer')
