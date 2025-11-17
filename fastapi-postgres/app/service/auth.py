from datetime import datetime, timedelta, UTC

from fastapi import Body, Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from common.config import conf
from common.db_model.models import TeacherModel
from common.enums import DBOperator
from common.serializers import DBQuery, FilterQuery, Token
from common.utils import BaseUtils

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


class Auth(BaseUtils):
    @staticmethod
    async def jwt_required(token: str = Depends(oauth2_scheme)) -> TeacherModel.table:
        return await Auth.validate_token(token)

    @staticmethod
    def user_filtered_query(field_name: str = conf.AUTH_PARENT_FIELD):
        def _inject_user_filter(
                filter_query: FilterQuery = Body(default=FilterQuery()),
                user_auth: TeacherModel.table = Depends(Auth.jwt_required),
        ) -> FilterQuery:
            filter_query.query.append(
                DBQuery(key=field_name, opt=DBOperator.eq, value=int(user_auth.id))
            )
            return filter_query

        return Depends(_inject_user_filter)

    @classmethod
    async def authenticate_user(cls, _id: int, phone: int) -> Token:
        filter_query = FilterQuery(
            query=[
                DBQuery(key="id", opt=DBOperator.eq, value=_id),
                DBQuery(key="phone", opt=DBOperator.eq, value=phone),
            ]
        )

        teacher: TeacherModel.table = await TeacherModel.fetch_rows(
            filter_query=filter_query, limit=1
        )

        if not teacher:
            raise cls.error_authenticate()

        return cls.create_token(_id)

    @classmethod
    async def validate_token(cls, token: str) -> TeacherModel.table:
        try:
            payload = jwt.decode(
                token, conf.JWT_SECRET, algorithms=[conf.JWT_ALGORITHM]
            )
            _id = payload.get("id")
            teacher: TeacherModel.table = await TeacherModel.get_by_id(_id=_id)
            if not teacher:
                raise cls.error_authenticate()
            return teacher

        except (JWTError, Exception):
            raise cls.error_authenticate()

    @classmethod
    def create_token(cls, _id: int) -> Token:
        now = datetime.now(UTC)
        payload = {
            "iat": now,
            "nbf": now,
            "exp": now + timedelta(seconds=int(conf.JWT_EXP)),
            "id": _id,
        }
        token = jwt.encode(payload, conf.JWT_SECRET, algorithm=conf.JWT_ALGORITHM)
        return Token(token=token, id=_id)
