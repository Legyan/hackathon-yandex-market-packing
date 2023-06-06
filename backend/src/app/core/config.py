from pydantic import BaseSettings


class Settings(BaseSettings):
    app_title: str = 'YM-packing'
    app_description: str = 'Help packers Yandex Market'
    database_url: str = 'postgresql+asyncpg://postgres:postgres@localhost/postgres'

    class Config:
        env_file = '.env'


settings = Settings()
