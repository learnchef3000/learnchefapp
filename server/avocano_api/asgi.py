#!/usr/bin/python
#
# Copyright 2025 LearnChef3000

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "learnchef_api.settings")

application = get_asgi_application()
