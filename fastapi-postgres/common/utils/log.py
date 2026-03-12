import inspect
import logging
import sys

from common.config import IS_LOCAL


class Log:
    ICONS = {
        "debug": "🛠️",
        "info": "ℹ️",
        "warning": "⚠️",
        "error": "❌",
        "critical": "🔥",
        "exception": "🧨",
    }

    def __init__(self, use_icons: bool = True):
        self.use_icons = use_icons
        self.logger = logging.getLogger("live-logger")
        self.logger.setLevel(logging.DEBUG)

        if not self.logger.handlers:
            formatter = logging.Formatter("%(levelname)s - %(message)s")

            if IS_LOCAL:
                stdout_level = logging.DEBUG
                stderr_level = logging.WARNING
            else:
                stdout_level = logging.INFO
                stderr_level = logging.ERROR

            def stdout_filter(record):
                return record.levelno < stderr_level

            stdout_handler = logging.StreamHandler(sys.stdout)
            stdout_handler.setLevel(stdout_level)
            stdout_handler.addFilter(stdout_filter)
            stdout_handler.setFormatter(formatter)

            stderr_handler = logging.StreamHandler(sys.stderr)
            stderr_handler.setLevel(stderr_level)
            stderr_handler.setFormatter(formatter)

            self.logger.addHandler(stdout_handler)
            self.logger.addHandler(stderr_handler)

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
