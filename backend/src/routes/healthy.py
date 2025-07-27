from fastapi import APIRouter

router = APIRouter(prefix="/healthy", tags=["health"])


@router.get("/")
async def healthy():
    return {"status": True}
