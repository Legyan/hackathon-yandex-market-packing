# hackathon-yandex-market-packing

Проект разработан для определения наиболее эффективного способа упаковки товара и предоставления этой инфрмации упаковщику Яндекс Маркета.

Разработан в рамках хакатона командой №10.

[![YM-pack workflow](https://github.com/Legyan/hackathon-yandex-market-packing/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/Legyan/hackathon-yandex-market-packing/actions/workflows/main.yml)

Развёрнутый проект доступен по адресу http://62.84.121.232.

Swagger документация backend: http://62.84.121.232:8000/docs.

Swagger документация DS: http://62.84.121.232:8001/docs.

### Стек технологий 

![](https://img.shields.io/badge/Python-3.9-black?style=flat&logo=python) 
![](https://img.shields.io/badge/FastAPI-0.78.0-black?style=flat&logo=fastapi)
![](https://img.shields.io/badge/Pydantic-1.9.1-black?style=flat)
![](https://img.shields.io/badge/SQLAlchemy-1.4.29-black?style=flat)
![](https://img.shields.io/badge/Pandas-2.0.2-black?style=flat&logo=pandas)
![](https://img.shields.io/badge/Numpy-1.24.3-black?style=flat&logo=numpy)
![](https://img.shields.io/badge/LightGBM-3.3.5-black?style=flat&logo=lightgbm)
![](https://img.shields.io/badge/Typing-3.7.4.3-black?style=flat&logo=typing)
![](https://img.shields.io/badge/Uvicorn-0.22.0-black?style=flat&logo=uvicorn)
![](https://img.shields.io/badge/Docker-black?style=flat&logo=docker)

## Описание
 
 ...
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
    DB_HOST=localhost
    DB_PORT=5432
    DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost/postgres
    SECRET_KEY=secret_key
    HOST=localhost
   ```

3. Запустить все контейнеры приложения с помощью Docker-compose:

    ```shell
    sudo docker-compose up -d --build
    ```

4. Применить миграции к базе данных:

    ```shell
    cd ../../backend/src/
    ```

5. Создать в директории файл .env и заполнить его согласно примеру в .env.example.

    ```shell
   nano .env
   ```

   ```
   # Переменные базы данных
   POSTGRES_DB=ym-packing
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   DB_HOST=localhost
   DB_PORT=5432
   DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost/postgres
   ```

6. Применить миграции к базе данных.

   ```shell
   sudo docker exec infra_backend-ym-pack_1 alembic upgrade head
   ```

7. Заполнить базу данных тестовыми данными:

    ```shell
    sudo docker exec infra_backend-ym-pack_1 python3 -m app.management.fill_db
    ```

## Методика тестирования проекта

...

## Команда

...
