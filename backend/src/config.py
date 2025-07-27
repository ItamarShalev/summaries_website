from pydantic_settings import BaseSettings, SettingsConfigDict


class Environment(BaseSettings):
    DEVELOPMENT: bool

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )
