from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routes.api import router as router_api
from src.utils import Utils

app = FastAPI()
environment = Utils.environment()

if True:
    app.add_middleware(
        CORSMiddleware,
        allow_credentials=True,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Force all routes to have prefix /api/v1
app.include_router(router_api)
