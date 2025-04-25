#!/usr/bin/python
#
# Copyright 2025 LearnChef3000


from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.static import serve

from learnchef_api.views import index

urlpatterns = [
    path("", index, name="index"),
    path("api/", include("store.urls")),
    path("admin/", admin.site.urls),
]


if settings.DEBUG:
    urlpatterns += [
        re_path(
            r"^media/(?P<path>.*)$",
            serve,
            {"document_root": settings.MEDIA_ROOT, "show_indexes": True},
        )
    ]
