#!/usr/bin/python
#
# Copyright 2025 LearnChef3000


from django.urls import include, path
from rest_framework.routers import DefaultRouter
from store import views

router = DefaultRouter()
# existing registrations...
router.register(r"topics", views.TopicViewSet, basename="topic")
router.register(r"tests", views.TestViewSet, basename="test")
router.register(r"questions", views.QuestionViewSet, basename="question")
router.register(r"answers", views.AnswerChoiceViewSet, basename="answer")

urlpatterns = [
    path("", include(router.urls)),
    # ... other paths ...
]
