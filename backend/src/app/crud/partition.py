from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.exceptions import NoFreePatririonError
from app.crud.base import CRUDBase
from app.models.partition import Partition


class CRUDPartition(CRUDBase):
    """CRUD ячейки."""

    async def set_partition_to_order(
            self,
            orderkey: str,
            session: AsyncSession
    ) -> str:
        """Помещение заказа в ячейку."""

        partition = (await session.execute(
            select(Partition).where(Partition.orderkey.is_(None))
        )).scalars().first()
        if not partition:
            raise NoFreePatririonError()
        partition.orderkey = orderkey
        session.add(partition)
        await session.commit()
        await session.refresh(partition)
        return partition.name


partition_crud = CRUDPartition(Partition)
