#!/usr/bin/python
#
# Copyright 2025 LearnChef3000


from django.http import HttpResponse


def index(request):
    return HttpResponse(
        """
    <body>
        <style>li { list-style: none;} li::before { content: "➡ "}</style>
        <h1>✨🥑✨</h1>
        <ul>
            <li><a href="/api">/api</a></li>
            <li><a href="/admin">/admin</a></li>
        </ul>
    </body>
    """
    )
