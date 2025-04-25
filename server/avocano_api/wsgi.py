#!/usr/bin/python
#
# Copyright 2025 LearnChef3000


import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "learnchef_api.settings")

application = get_wsgi_application()
