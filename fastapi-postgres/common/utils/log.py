import inspect
import logging
import sys

from common.config import IS_LOCAL

# from datetime import datetime, timedelta, timezone


# class IsraelFormatter(logging.Formatter):
#     def formatTime(self, record, dateformat=None):
#         dt = datetime.fromtimestamp(record.created, tz=timezone(timedelta(hours=3)))
#         return dt.strftime(dateformat or "%Y-%m-%d %H:%M:%S")


class Log:
    ICONS = {
        "debug": "🛠️",
        "info": "ℹ️",
        "warning": "⚠️",
        "error": "❌",
        "critical": "🔥",
        "exception": "🧨",
    }

    def __init__(self, use_icons=True):
        self.use_icons = use_icons
        self.logger = logging.getLogger("live-logger")
        self.logger.setLevel(logging.DEBUG)

        if not self.logger.handlers:
            # formatter = IsraelFormatter("%(asctime)s - %(levelname)s - %(message)s")
            formatter = logging.Formatter("%(levelname)s - %(message)s")

            if IS_LOCAL:
                stdout_handler = logging.StreamHandler(sys.stdout)
                stdout_handler.setLevel(logging.DEBUG)
                stdout_handler.addFilter(
                    lambda record: record.levelno < logging.WARNING
                )
                stdout_handler.setFormatter(formatter)

                stderr_handler = logging.StreamHandler(sys.stderr)
                stderr_handler.setLevel(logging.WARNING)
                stderr_handler.setFormatter(formatter)

                self.logger.addHandler(stdout_handler)
                self.logger.addHandler(stderr_handler)
            else:
                unified_handler = logging.StreamHandler(sys.stdout)
                unified_handler.setLevel(logging.DEBUG)
                unified_handler.setFormatter(formatter)
                self.logger.addHandler(unified_handler)

    def _log(self, level: str, message: str, exc_info=False):
        icon = self.ICONS.get(level, "") if self.use_icons else ""
        frame = inspect.stack()[2]
        filename = frame.filename.split("/")[-1]
        location = f"{filename}:{frame.lineno} in {frame.function}"
        full_msg = f"{icon} {message}  📍 {location}"
        getattr(self.logger, level if level != "exception" else "error")(
            full_msg, exc_info=exc_info
        )

    def debug(self, message: str):
        self._log("debug", message)

    def info(self, message: str):
        self._log("info", message)

    def warning(self, message: str):
        self._log("warning", message)

    def error(self, message: str):
        self._log("error", message)

    def critical(self, message: str):
        self._log("critical", message)

    def exception(self, message: str):
        self._log("exception", message, exc_info=True)


logger = Log()
