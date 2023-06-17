from sqlalchemy import Column, ForeignKey, String

from app.core.db import Base


class HonestSign(Base):
    """Модель маркировки "Честный знак"."""

    __tablename__ = 'honest_signs'

    honest_sign = Column(String(500), unique=True)
    barcode = Column(
        String(500), ForeignKey('barcode_sku.barcode'), unique=True
    )
