from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import RedirectResponse

import os
import requests
from jose import jwt

GOOGLE_REDIRECT_URI = "http://localhost:8000/api/v1/auth/google";
google_loguin_router = APIRouter(prefix="/auth/google/loguin", tags=["auth"])
google_auth_router = APIRouter(prefix="/auth/google", tags=["auth"])
google_auth_token = APIRouter(prefix="/auth/google/token", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@google_loguin_router.get("/")
async def google_login():
    redirect_url = f"https://accounts.google.com/o/oauth2/auth?response_type=code&client_id={os.environ['GOOGLE_CREDENTIALS_SUMMARIES_WEBSITE_CLIENT_ID']}&redirect_uri={GOOGLE_REDIRECT_URI}&scope=openid%20profile%20email&access_type=offline"
    return RedirectResponse(url=redirect_url)
    
@google_auth_router.get("/")
async def google_auth(code: str):
    token_url = "https://accounts.google.com/o/oauth2/token"
    data = {
        "code": code,
        "client_id": os.environ["GOOGLE_CREDENTIALS_SUMMARIES_WEBSITE_CLIENT_ID"],
        "client_secret": os.environ["GOOGLE_CREDENTIALS_SUMMARIES_WEBSITE_CLIENT_SECRET"],
        "redirect_uri": GOOGLE_REDIRECT_URI,
        "grant_type": "authorization_code",
    }
    response = requests.post(token_url, data=data)
    access_token = response.json().get("access_token")
    user_info = requests.get("https://www.googleapis.com/oauth2/v1/userinfo", headers={"Authorization": f"Bearer {access_token}"})
    return user_info.json()

@google_auth_token.get("/")
async def get_token(token: str = Depends(oauth2_scheme)):
    return jwt.decode(token, os.environ["GOOGLE_CREDENTIALS_SUMMARIES_WEBSITE_CLIENT_SECRET"], algorithms=["HS256"])