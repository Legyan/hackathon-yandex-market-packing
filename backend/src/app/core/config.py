from pydantic import BaseSettings


class Settings(BaseSettings):
    app_title: str = 'YM-packing'
    app_description: str = 'Help packers Yandex Market'
    database_url: str = 'postgresql+asyncpg://postgres:postgres@localhost/postgres'
    secret_key: str = 'secret_key'

    class Config:
        env_file = '.env'


settings = Settings()
