from typing import Any, List, Optional, Set, TypeAlias

from pydantic import BaseModel
from pydantic import Field as PydanticField
from sqlalchemy.inspection import inspect as sa_inspect
from sqlalchemy.orm.attributes import NO_VALUE
from sqlmodel import Field, SQLModel

from common.enums import DBOperator


class BaseTable(SQLModel):
    def model_dump(
        self,
        *,
        include_relations: bool = False,
        max_depth: int = 1,
        _visited: Set[int] | None = None,
        **kwargs: Any,
    ) -> dict[str, Any]:
        base = super().model_dump(**kwargs)
        if not include_relations or max_depth <= 0:
            return base

        vid = id(self)
        visited = _visited or set()
        if vid in visited:
            return base
        visited.add(vid)

        insp = sa_inspect(self, raiseerr=False)
        if not insp:
            return base

        for rel in insp.mapper.relationships:
            key = rel.key
            if key in base:
                continue
            state = insp.attrs.get(key)
            if not state:
                continue

            loaded = state.loaded_value
            if loaded is NO_VALUE:
                continue

            if rel.uselist:
                base[key] = [
                    obj.model_dump(
                        include_relations=True,
                        max_depth=max_depth - 1,
                        _visited=visited,
                    )
                    for obj in (loaded or [])
                    if isinstance(obj, BaseTable)
                ]
            else:
                obj = loaded
                base[key] = (
                    obj.model_dump(
                        include_relations=True,
                        max_depth=max_depth - 1,
                        _visited=visited,
                    )
                    if isinstance(obj, BaseTable)
                    else obj
                )
        return base


RowLike: TypeAlias = BaseTable | BaseModel | dict[str, Any]


class IdBaseTable(BaseTable):
    id: Optional[int] = Field(default=None, primary_key=True)

    def __hash__(self):
        return hash(self.id)

    def __eq__(self, other):
        if isinstance(other, self.__class__):
            return self.id == other.id
        else:
            return other == self.id

    model_config = {"use_enum_values": True}


class DBQuery(BaseModel):
    opt: DBOperator
    key: str
    value: Any


class FilterQuery(BaseModel):
    query: List[DBQuery] = []
    relation_model: bool = False
    sort: Optional[str] = None


class Pagination(BaseModel):
    limit: int = PydanticField(0, ge=0)
    offset: int = PydanticField(0, ge=0)


class Token(BaseModel):
    token: str
    id: int
