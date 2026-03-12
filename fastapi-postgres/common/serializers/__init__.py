from typing import Any, TypeAlias

from pydantic import BaseModel, Field
from sqlalchemy.inspection import inspect as sa_inspect
from sqlalchemy.orm.attributes import NO_VALUE
from sqlmodel import Field as SQLModelField
from sqlmodel import SQLModel

from common.enums import DBOperator


class BaseTable(SQLModel):
    def model_dump(
        self,
        *,
        include_relations: bool = False,
        max_depth: int = 1,
        _visited: set[int] | None = None,
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
    id: int | None = SQLModelField(default=None, primary_key=True)

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
    query: list[DBQuery] = Field(default_factory=list)
    count: bool = False
    or_query: list[DBQuery] = Field(default_factory=list)
    # Sort string format: "field:asc" or "field:desc".
    # Multiple sorts can be applied by separating with commas.
    # Example: "created_at:desc,name:asc"
    sort: str | None = None
    sort_first: list[Any] | None = None

    # Relations
    relation_model: bool = False
    relations: list[str] | None = None  # e.g. ["job", "job.company"]
    columns: list[Any] | None = (
        None  # root cols: [table.id, table.name, ...] — must pass ORM attributes, not .key
    )
    relation_cols: dict[str, list[str]] | None = (
        None  # {"job":["id","title"], "profile":["id","name"]}
    )

    # Aggregation
    aggregates: list[tuple[str, Any]] = Field(default_factory=list)
    joins: list[tuple[Any, Any, bool]] = Field(default_factory=list)
    group_by: list[Any] = Field(default_factory=list)
    distinct_on: list[Any] | None = None


class Pagination(BaseModel):
    limit: int = Field(0, ge=0)
    offset: int = Field(0, ge=0)


class Token(BaseModel):
    token: str
    id: int
