from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import relationship

from app.core.db import Base


class Table(Base):
    """Модель стола для упаковки."""

    __tablename__ = 'tables'

    name = Column(String(50), unique=True, nullable=False)
    user_id = Column(
        Integer, ForeignKey('users.id'), unique=True
    )
    updated_at = Column(DateTime, onupdate=func.now())

    user = relationship('User', back_populates='table')
