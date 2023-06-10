from sqlalchemy.ext.asyncio import AsyncSession

from app.api.services.base import BaseService
from app.crud.pack_variation import pack_variation_crud
from app.schemas.pack_variation import PackingVariationsSchema


class PackingVariationService(BaseService):
    """Сервис для работы с вариантами упаковки."""

    async def write_pack_variations_to_db(
        self,
        packing_variations: PackingVariationsSchema,
        session: AsyncSession,
    ) -> None:
        pass


pack_variation_service = PackingVariationService(pack_variation_crud)
