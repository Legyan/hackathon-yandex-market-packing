from sqlalchemy import Column, ForeignKey, String

from app.core.db import Base


class HonestSign(Base):
    __tablename__ = 'honest_signs'

    honest_sigt = Column(String(500), unique=True)
    barcode = Column(
        String(500), ForeignKey('barcode_sku.barcode'), unique=True
    )
