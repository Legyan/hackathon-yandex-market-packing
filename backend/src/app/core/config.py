from pydantic import BaseSettings


class Settings(BaseSettings):
    app_title: str = 'YM-packing'
    app_description: str = 'Help packers Yandex Market'
    database_url: str = 'postgresql+asyncpg://postgres:postgres@localhost/pack'

    class Config:
        env_file = '.env'


settings = Settings()
