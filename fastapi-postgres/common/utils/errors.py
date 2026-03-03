from typing import Any

from fastapi import HTTPException, status


class ErrorService:

    @classmethod
    def error_authenticate(cls) -> HTTPException:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    @classmethod
    def error_400(cls, details: Any = "general problem") -> HTTPException:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"error: {str(details)}",
        )
