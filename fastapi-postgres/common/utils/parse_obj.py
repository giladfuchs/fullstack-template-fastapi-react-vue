from datetime import datetime
from typing import Dict, List, Union, get_type_hints

from pydantic import BaseModel

from common.serializers import BaseTable


class ParseObj:
    @classmethod
    def set_elements_by_dict(
        cls,
        db_obj: BaseTable,
        new_obj: Union[BaseModel, BaseTable, Dict],
        exclude_items: List[str] = [],
    ):
        def extract_items(obj):
            if hasattr(obj, "model_dump"):
                return obj.model_dump(exclude_none=True)

            return obj

        def update_nested(target, updates):
            if isinstance(target, dict):
                target.update(
                    {k: v for k, v in updates.items() if k not in exclude_items}
                )
            else:
                for k, v in updates.items():
                    if k not in exclude_items:
                        setattr(target, k, v)

        def coerce_datetime_if_needed(field_name, value):
            expected_types = get_type_hints(db_obj.__class__)
            if field_name in expected_types and expected_types[field_name] == datetime:
                if isinstance(value, str):
                    try:
                        return datetime.fromisoformat(value)
                    except Exception:
                        return value
            return value

        items = extract_items(new_obj)

        for key, value in items.items():
            if key in exclude_items:
                continue

            current_value = getattr(db_obj, key, None)

            if isinstance(value, dict):
                if current_value is not None:
                    update_nested(current_value, value)
                else:
                    try:
                        related_class = getattr(
                            db_obj.__class__, key
                        ).property.mapper.class_
                        setattr(db_obj, key, related_class(**value))
                    except Exception:
                        pass

            elif isinstance(value, list) and value and isinstance(value[0], dict):
                try:
                    related_class = getattr(
                        db_obj.__class__, key
                    ).property.mapper.class_
                    setattr(db_obj, key, [related_class(**v) for v in value])
                except Exception:
                    setattr(db_obj, key, value)  # fallback to raw list if no mapper

            else:
                try:
                    value = coerce_datetime_if_needed(key, value)
                    setattr(db_obj, key, getattr(new_obj, key, value))
                except Exception:
                    setattr(db_obj, key, value)
