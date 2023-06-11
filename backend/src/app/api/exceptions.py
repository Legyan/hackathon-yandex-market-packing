from fastapi import HTTPException, status


class AlreadyHaveOrderError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='У пользователя есть незакрытый заказ.'
        )

class NoProductError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Такого товара нет в базе данных.'
        )


class NoTableError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Стола с введённым table_id не существует.'
        )


class NoUserError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Пользователя с введённым user_id не существует.'
        )


class OrderkeyAlreadyExistError(HTTPException):
    def __init__(self, orderkey):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f'Заказ с orderkey {orderkey} уже существует.'
        )


class OutOfStockError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Недостаточно единиц товара на складе.'
        )
