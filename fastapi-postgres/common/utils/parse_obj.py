from typing import List

from common.serializers import BaseModelUtil, BaseTable


def set_elements_by_dict(
    db_obj: BaseTable, new_obj: BaseModelUtil, exclude_items: List[str] = [],   **kwargs,
):
    try:
        for field_key, v in new_obj.dict().items():
            if field_key not in exclude_items:
                setattr(db_obj, field_key, v)
    except:
        for field_key, v in new_obj.items():
            if field_key not in exclude_items:
                setattr(db_obj, field_key, v)
