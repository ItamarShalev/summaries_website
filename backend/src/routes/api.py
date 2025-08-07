from fastapi import APIRouter

from src.routes.healthy import router as healthy_router
from src.routes.auth import google_auth_router as google_auth
from src.routes.auth import google_loguin_router as google_loguin
from src.routes.auth import google_auth_token as google_auth_token
router = APIRouter(prefix="/api/v1")
router.include_router(healthy_router)
router.include_router(google_auth) # The google auth callback page
router.include_router(google_loguin) # The google login page
router.include_router(google_auth_token) # The google teken request
