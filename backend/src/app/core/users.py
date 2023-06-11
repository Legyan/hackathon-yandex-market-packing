from fastapi import HTTPException, Header
from typing import Optional
import jwt

from app.core.config import settings


def get_current_user_id(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=403, detail="Unauthorized")
    print(authorization)
    prefix, token = authorization.split()

    if prefix.lower() != "bearer":
        raise HTTPException(
            status_code=403, detail="Invalid authorization scheme"
        )

    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=["HS256"])
        print(payload)
        return payload["user_id"]
    except jwt.PyJWTError:
        raise HTTPException(status_code=403, detail="Invalid token")

from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def token_auth(token: str = Depends(oauth2_scheme)) -> str:
    if token != "your-secret-token":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return token
