# hackathon-yandex-market-packing

### Запуск бэкенда

1. Запустить Docker контейнер с БД.

    ```shell
    sudo docker compose -f infra/docker-pg.yml up -d
    ```

2. Перейти в директорию backend/src.

    ```shell
    cd backend/src/
    ```

3. Создать в директории файл .env и заполнить его согласно примеру в .env.example.
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

4. Применить миграции к базе данных.
   ```shell
   alembic upgrade head
   ```

5. Запустить Docker контейнер с бэкендом.

    ```shell
    sudo docker run -it -p 8000:8000 backend-packing
    ```