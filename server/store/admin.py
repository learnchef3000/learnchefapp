#!/usr/bin/python
#
# Copyright 2025 LearnChef3000


from django.contrib import admin
from store.models import Topic, Test, Question, AnswerChoice

@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ("name", "exam_date", "created_at")

@admin.register(Test)
class TestAdmin(admin.ModelAdmin):
    list_display = ("id", "topic", "created_at")

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("id", "test", "text")

@admin.register(AnswerChoice)
class AnswerChoiceAdmin(admin.ModelAdmin):
    list_display = ("id", "question", "text", "is_correct")