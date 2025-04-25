#!/usr/bin/python
#
# Copyright 2025 LearnChef3000

from rest_framework import serializers
from store.models import Topic, Test, Question, AnswerChoice

class AnswerChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerChoice
        fields = ["id", "text", "is_correct"]

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ["id", "text", "answers"]

class TestSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Test
        fields = ["id", "created_at", "questions"]

class TopicSerializer(serializers.ModelSerializer):
    tests = TestSerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        fields = ["id", "name", "exam_date", "pdf_file", "tests"]
