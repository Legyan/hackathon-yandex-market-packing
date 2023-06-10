from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.pack_variation import PackingVariation
from app.schemas.pack_variation import PackingVariationsSchema


class CRUDPackingVariation(CRUDBase):
    async def write_pack_variations_to_db(
        self,
        packing_variations: PackingVariationsSchema,
        session: AsyncSession,
    ) -> None:
        new_pack_variriation = PackingVariation()
        await session.commit()
        await session.refresh(new_pack_variriation)


pack_variation_crud = CRUDPackingVariation(PackingVariation)
