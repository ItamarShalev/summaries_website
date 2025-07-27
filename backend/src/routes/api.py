from fastapi import APIRouter

from src.routes.healthy import router as healthy_router

router = APIRouter(prefix="/api/v1")
router.include_router(healthy_router)
