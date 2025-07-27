from functools import lru_cache
from pathlib import Path

from dotenv import load_dotenv
from pydantic import ValidationError

from src.config import Environment


# ty: ignore[missing-argument]
class Utils:

    @staticmethod
    @lru_cache(maxsize=1)
    def environment() -> Environment:
        Utils.load_environment_variables()
        return Environment() # ty: ignore[missing-argument]

    @staticmethod
    def project_path() -> Path:
        return Utils.root_path().parent

    @staticmethod
    def root_path() -> Path:
        return Path(__file__).parent.parent

    @staticmethod
    def load_environment_variables() -> None:
        env_path = Utils.root_path() / ".env"
        example_path = Utils.root_path() / ".env.example"

        if env_path.exists():
            load_dotenv(dotenv_path=env_path)
        elif example_path.exists():
            load_dotenv(dotenv_path=example_path)

        try:
            # Validate environments after loading environment variables
            _ = Environment() # ty: ignore[missing-argument]
        except ValidationError as error:
            raise RuntimeError(f"Missing environment variables:\nCheck your .env file\n{error}") from None
