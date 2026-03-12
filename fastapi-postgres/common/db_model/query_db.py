from sqlalchemy.orm import load_only, selectinload
from sqlmodel import case, func, or_, select, text

from common.enums import DBOperator
from common.serializers import DBQuery, FilterQuery

opts = {
    DBOperator.eq: "__eq__",
    DBOperator.ne: "__ne__",
    DBOperator.lt: "__lt__",
    DBOperator.le: "__le__",
    DBOperator.gt: "__gt__",
    DBOperator.ge: "__ge__",
    DBOperator.like: "like",
    DBOperator.ilike: "ilike",  # PostgreSQL only
    DBOperator.in_: "in_",
    DBOperator.not_in: "notin_",
    DBOperator.contains: "contains",
    DBOperator.is_: "is_",
    DBOperator.is_not: "isnot",
}


class QueryDB:
    # Generate SQLAlchemy filter conditions with AND logic from a list of DBQuery objects
    @classmethod
    def generate_where_query(cls, query: list[DBQuery], use_or: bool = False):
        # Build a tuple of SQLAlchemy expressions by applying the operator (e.g., ==, >=) on each field

        conditions = [
            getattr(getattr(cls.table, q.key), opts.get(q.opt, q.opt))(q.value)
            for q in query
            if hasattr(cls.table, q.key)
            and hasattr(getattr(cls.table, q.key), opts.get(q.opt, q.opt))
        ]

        return (or_(*conditions),) if use_or else tuple(conditions)

    @classmethod
    def build_query(
        cls, filter_query: FilterQuery, offset: int = 0, limit: int = 1000, **kwargs
    ):
        if filter_query.aggregates:
            cols = [
                cls.table,
                *[func.count(agg).label(lbl) for (lbl, agg) in filter_query.aggregates],
            ]
            statement = select(*cols)

        else:
            statement = select(cls.table)

        if filter_query.columns:
            statement = statement.options(load_only(*filter_query.columns))

        for right_tbl, onclause, is_outer in filter_query.joins or []:
            statement = (
                statement.outerjoin(right_tbl, onclause)
                if is_outer
                else statement.join(right_tbl, onclause)
            )

        if filter_query.query:
            statement = statement.where(
                *cls.generate_where_query(filter_query.query, use_or=False)
            )

        if filter_query.or_query:
            statement = statement.where(
                *cls.generate_where_query(filter_query.or_query, use_or=True)
            )

        if filter_query.count:
            base = statement.order_by(None)
            if filter_query.group_by:
                base = base.with_only_columns(*filter_query.group_by).group_by(
                    *filter_query.group_by
                )
            else:
                base = base.with_only_columns(getattr(cls.table, "id")).distinct()
            statement = select(func.count()).select_from(base.subquery())
            return statement

        if not filter_query.count:
            if filter_query.distinct_on:
                statement = statement.distinct(*filter_query.distinct_on)

            if filter_query.group_by:
                statement = statement.group_by(*filter_query.group_by)
            elif filter_query.aggregates:
                pk = getattr(cls.table, "id", None)
                if pk is not None:
                    statement = statement.group_by(pk)

            if filter_query.sort_first:
                field, values = filter_query.sort_first
                col = getattr(cls.table, field, None) or (
                    text(field) if filter_query.aggregates else None
                )
                if col is not None:
                    statement = statement.order_by(
                        case((col.in_(values), 0), else_=1).asc()
                    )

            if filter_query.sort:
                sorts = filter_query.sort.split(",")

                for s in sorts:
                    try:
                        field, direction = s.split(":")
                        col = getattr(cls.table, field, None)
                        if col is None and filter_query.aggregates:
                            col = text(field)

                        if col is not None:
                            statement = statement.order_by(
                                col.asc() if direction.lower() == "asc" else col.desc()
                            )

                    except Exception:
                        raise ValueError(
                            "Invalid sort format. Use 'field:asc' or 'field:desc'."
                        )
            if offset:
                statement = statement.offset(offset)
            if limit:
                statement = statement.limit(limit)

            if filter_query.relation_model:
                statement = cls.apply_eagerloads(
                    statement,
                    cls.table,
                    filter_query.relations,
                    filter_query.relation_cols,
                )

        return statement

    @classmethod
    def _eager_for_path(cls, model_cls, path: str):
        parts = path.split(".")
        q = None
        current = model_cls

        for p in parts:
            attr = getattr(current, p)
            q = q.selectinload(attr) if q is not None else selectinload(attr)
            current = attr.property.mapper.class_

        return q, current

    @classmethod
    def apply_eagerloads(
        cls,
        statement,
        model_cls,
        relations: list[str] | None,
        relation_cols: dict[str, list[str]] | None,
    ):
        if not relations and not relation_cols:
            return statement.options(selectinload("*"))

        paths = relations or list((relation_cols or {}).keys())
        loaders = []
        for path in paths:
            loader, target_cls = cls._eager_for_path(model_cls, path)
            cols = (relation_cols or {}).get(path) or (relation_cols or {}).get(
                path.replace(".", "__")
            )
            if cols:
                attrs = [getattr(target_cls, c) for c in cols]
                loader = loader.options(load_only(*attrs))
            loaders.append(loader)

        return statement.options(*loaders) if loaders else statement
