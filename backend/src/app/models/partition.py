from sqlalchemy import Column, DateTime, ForeignKey, String, func
from sqlalchemy.orm import relationship

from app.core.db import Base


class Partition(Base):
    """Модель ячейки с товарами заказа для упаковки."""

    __tablename__ = 'partitions'

    name = Column(String(100), unique=True, nullable=False)
    orderkey = Column(
        String(50), ForeignKey('orders.orderkey'), unique=True
    )
    updated_at = Column(
        DateTime, server_default=func.now(), onupdate=func.now()
    )

    order = relationship('Order')
