from fastapi import APIRouter

from app.api.endpoints import order_router


main_router = APIRouter()
main_router.include_router(
    order_router, prefix='/order', tags=['Orders']
)
