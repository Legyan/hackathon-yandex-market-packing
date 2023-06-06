# hackathon-yandex-market-packing

### Запуск бэкенда

1. Запустить Docker контейнер с БД.

    ```shell
    sudo docker compose -f infra/docker-pg.yml up -d
    ```

2. Перейти в директорию backend/src

    ```shell
    cd backend/src/
    ```

3. Применить миграции к базе данных.
   ```shell
   alembic upgrade head
   ```

4. Запустить Docker контейнер с бэкендом.

    ```shell
    sudo docker run -it -p 8000:8000 backend-packing
    ```