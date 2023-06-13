from typing import Optional

import jwt
from fastapi import Header, HTTPException

from app.core.config import settings


def get_current_user_id(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=403, detail="Unauthorized")
    prefix, token = authorization.split()

    if prefix.lower() != "bearer":
        raise HTTPException(
            status_code=403, detail="Invalid authorization scheme"
        )

    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=["HS256"])
        return payload["user_id"]
    except jwt.PyJWTError:
        raise HTTPException(status_code=403, detail="Invalid token")
