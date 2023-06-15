from fastapi import HTTPException, status


class AlreadyHaveOrderError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='У пользователя есть незакрытый заказ.'
        )


class AlreadyHaveImeiError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='IMEI для этого товара уже просканирован.'
        )


class AlreadyHaveHonestSignError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='"Честный знак" для этого товара уже просканирован.'
        )


class NoActivePackageError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Нет открытых коробок/пакетов.'
        )


class NotAllBoxesClosedError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Не все коробки в заказе закрыты.'
        )


class NotAllOrderPackedError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Упакован не весь заказ.'
        )


class NotRegiserTableError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Пользователь не зарегистрировал стол.'
        )


class NoFreePatririonError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Нет свободных ячеек для заказа.'
        )


class NoPrinterError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Принтера с данным printer_id нет в базе данных.'
        )


class NoBarcodeError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Штрихкода нет в базе данных.'
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


class TableIsBusyError(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Стол уже занят.'
        )


class UserAlreadyHaveTableError(HTTPException):
    def __init__(self, table_id):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f'За вами уже зарегистрирован стол {table_id}.'
        )
