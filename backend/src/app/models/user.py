from sqlalchemy import Column, String

from app.core.db import Base


class User(Base):
    __tablename__ = 'users'

    name = Column(String(100), unique=True, nullable=False)
