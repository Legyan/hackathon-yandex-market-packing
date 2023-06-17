from sqlalchemy import Column, ForeignKey, String

from app.core.db import Base


class Imei(Base):
    """Модель IMEI товара."""

    __tablename__ = 'imeis'

    imei = Column(String(50), unique=True)
    barcode = Column(
        String(500), ForeignKey('barcode_sku.barcode'), unique=True
    )
