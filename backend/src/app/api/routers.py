from fastapi import APIRouter

from app.api.endpoints import (auth_router, barcode_router, order_router,
                               package_router, user_router)

main_router = APIRouter(prefix='/api/v1')
main_router.include_router(
    auth_router, prefix='/register', tags=['Register']
)
main_router.include_router(
    user_router, prefix='/user', tags=['User']
)
main_router.include_router(
    order_router, prefix='/order', tags=['Orders']
)
main_router.include_router(
    barcode_router, prefix='/barcode', tags=['Barcode']
)
main_router.include_router(
    package_router, prefix='/package', tags=['Package']
)
