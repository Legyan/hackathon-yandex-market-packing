from fastapi import HTTPException


class NoProductError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=400,
            detail='Такого товара нет в базе данных.'
        )


class OrderkeyAlreadyExistError(HTTPException):
    def __init__(self, orderkey):
        super().__init__(
            status_code=400,
            detail=f'Заказ с orderkey {orderkey} уже существует.'
        )


class OutOfStockError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=400,
            detail='Недостаточно единиц товара на складе.'
        )
