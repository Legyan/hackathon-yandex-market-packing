from fastapi import APIRouter

from app.api.endpoints import auth_router, barcode_router, order_router

main_router = APIRouter(prefix='/api/v1')
main_router.include_router(
    auth_router, tags=['Auth']
)
main_router.include_router(
    order_router, prefix='/order', tags=['Orders']
)
main_router.include_router(
    barcode_router, tags=['Barcode']
)
