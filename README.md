# hackathon-yandex-market-packing

Проект разработан для определения наиболее эффективного способа упаковки товара и предоставления этой информации упаковщику Яндекс Маркета.

Разработан в рамках хакатона командой №10.

[![YM-pack workflow](https://github.com/Legyan/hackathon-yandex-market-packing/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/Legyan/hackathon-yandex-market-packing/actions/workflows/main.yml)

Развёрнутый проект доступен по адресу http://62.84.121.232.

Swagger документация backend: http://62.84.121.232:8000/docs.

Swagger документация DS: http://62.84.121.232:8001/docs.

### Стек технологий 

![](https://img.shields.io/badge/Python-3.10-black?style=flat&logo=python) 
![](https://img.shields.io/badge/FastAPI-0.96.0-black?style=flat&logo=fastapi)
![](https://img.shields.io/badge/Uvicorn-0.17.0-black?style=flat&logo=uvicorn)
![](https://img.shields.io/badge/Pydantic-1.10.8-black?style=flat)
![](https://img.shields.io/badge/SQLAlchemy-1.4.36-black?style=flat)
![](https://img.shields.io/badge/Pandas-2.0.2-black?style=flat&logo=pandas)
![](https://img.shields.io/badge/Numpy-1.24.3-black?style=flat&logo=numpy)
![](https://img.shields.io/badge/LightGBM-3.3.5-black?style=flat&logo=lightgbm)
![](https://img.shields.io/badge/Typing-3.7.4.3-black?style=flat&logo=typing)
![](https://img.shields.io/badge/React-18.2.0-black?style=flat&logo=react)
![](https://img.shields.io/badge/TypeScript-4.9.5-black?style=flat&logo=typescript)
![](https://img.shields.io/badge/Redux-4.2.1-black?style=flat&logo=redux)
![](https://img.shields.io/badge/Docker-black?style=flat&logo=docker)

## Описание

Для того, чтобы покупатель получил заказ, перед отправкой заказанные товары упаковывают в посылки. Компания заметила, что сотрудник тратит большое количество времени на выбор упаковочного материала, в который необходимо упаковать товары. Существует большое количество упаковочного материала (коробки, пакеты, пленка). Необходимо придумать способ подсказывать пользователю информацию о выборе упаковочного материала.

Интерфейс упаковщика должен отображать содержимое заказа для контроля комплектности. Интерфейс упаковщика должен на основании содержимого заказа, подсказывать упаковщику в какую тару (коробку, пакет, с учетом размера) нужно упаковать заказ. При определении варианта упаковки
(тары) для заказа нужно учитывать тип товара, весогабаритные характеристики и необходимость в дополнительной упаковке для хрупких товаров.

### Цели нашего проекта:

- с высокой точностью рекомендовать правильную упаковку для заказа, которая позволит доставить товары без порчи клиенту и минимизирует затраты на упаковочный материал;
- отображение статистики о работе модели;
- интерфейс о том, как советовать информацию по выбору коробки
пользователю.

### Данные

В нашем распоряжении историческая информация о заказанных товарах и упаковке, представленая в $6$ таблицах.
По количеству товаров в составе заказы распределены не равномерно, $65$ % из них с одним товаром. $97$ % заказов включает в себя не более $5$ товаров.

![orders 2](https://github.com/Legyan/hackathon-yandex-market-packing/assets/93463677/e61e3988-065a-452a-b09e-a224b8844a98)

Практически все заказы помещаются в одну упаковку (без учета товаров, не требующих упаковки или упакованных в пленку).

![one_pack_share 2](https://github.com/Legyan/hackathon-yandex-market-packing/assets/93463677/e6cc0c9d-a641-47b9-8e7a-ea9acbe11fb8)

Покрытие потребности заказчика при предсказании упаковки для заказов, включающих не более $5$ товаров, составляет $93.79$ %.

![output 2](https://github.com/Legyan/hackathon-yandex-market-packing/assets/93463677/fae867ef-5df4-4d1a-aeeb-422fa7dce390)


### Алгоритм
Предсказание упаковки можно разделить на $3$ основные части:
1. Выделение товаров не требующих упаковки или упаковываемых в пленку на основе карготипов $340$ и $360$;
2. Подбор упаковки для одного товара на основе накопленной статистики и с помощью сравнения габаритов товара с габаритами имеющихся упаковок. Предлагается самая дешевая из подошедших упаковок и, по возможности, еще 1-2 альтернативы.
   
 ![image_2023-06-16_10-16-41 2](https://github.com/Legyan/hackathon-yandex-market-packing/assets/93463677/7159c959-d43c-4cce-a632-5d9d7c5b9e50)

3. ML-подход для заказов с 2-5 товарами. Предлагается $3$ самые вероятные по мнению модели варианта упаковки.

### Результаты
Для $76.7$ % заказов алгоритм предсказывает подходящую и оптимальную по цене упаковку.
Экономия на упаковке составила $209$ $771.49$ руб. или $9.56$ %. Если считать, что в нашем распоряжении были данные за один день и распределение заказов в среднем соответствует датасету, то за год экономия может составить $76.5$ млн. руб.

![image_2023-06-17_23-28-28 2](https://github.com/Legyan/hackathon-yandex-market-packing/assets/93463677/ebab494b-3f2e-4b71-9ae3-ff966c874993)

## Запуск проекта

1. Перейти в директорию /infra:

    ```shell
    cd infra/
    ```

2. Создать в директории файл .env и заполнить его согласно примеру в .env.example:

    ```shell
   nano .env
   ```

   ```
    POSTGRES_DB=ym-packing
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres
    DB_HOST=db-ym-pack
    DB_PORT=5432
    DATABASE_URL=postgresql+asyncpg://postgres:postgres@db-ym-pack/postgres
    HOST=localhost
    DS_HOST=ds-ym-pack:8001
    SECRET_KEY=SECRET_KEY
   ```

3. Запустить все контейнеры приложения с помощью Docker-compose:

    ```shell
    sudo docker-compose up -d --build
    ```

4. Применить миграции к базе данных.

   ```shell
   sudo docker exec infra_backend-ym-pack_1 alembic upgrade head
   ```

5. Заполнить базу данных тестовыми данными:

    ```shell
    sudo docker exec infra_backend-ym-pack_1 python3 -m app.management.fill_db
    ```

6. Сгенерировать штрих-коды товаров и добавить в базу:

    ```shell
    sudo docker exec infra_backend-ym-pack_1 python3 -m app.management.add_random_barcodes
    ```

7. Добавить тестовые заказы:

    ```shell
    sudo docker exec infra_backend-ym-pack_1 python3 -m app.management.add_orders
    ```

Проект будет развернут на машине и доступен по адресу http://localhost.

## Методика тестирования проекта

...

## Команда

...
