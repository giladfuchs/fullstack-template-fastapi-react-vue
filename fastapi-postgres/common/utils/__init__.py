from common.utils.errors import ErrorService
from common.utils.log import logger
from common.utils.parse_obj import ParseObj


class BaseUtils(ErrorService, ParseObj):
    logger = logger
