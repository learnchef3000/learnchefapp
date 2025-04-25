#!/usr/bin/python
#
# Copyright 2025 LearnChef3000


from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from store.models import Topic, Test, Question, AnswerChoice
from store.serializers import (
    TopicSerializer,
    TestSerializer,
    QuestionSerializer,
    AnswerChoiceSerializer,
)

class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    parser_classes = [MultiPartParser, FormParser]

class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.all()
    serializer_class = TestSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class AnswerChoiceViewSet(viewsets.ModelViewSet):
    queryset = AnswerChoice.objects.all()
    serializer_class = AnswerChoiceSerializer
