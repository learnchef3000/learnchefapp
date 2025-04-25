#!/usr/bin/python
#
# Copyright 2025 LearnChef3000


from django.db import models

class Topic(models.Model):
    name = models.CharField(max_length=200)
    exam_date = models.DateField()
    pdf_file = models.FileField(upload_to="topic_pdfs", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Test(models.Model):
    topic = models.ForeignKey(
        Topic, related_name="tests", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Test {self.id} for {self.topic.name}"

class Question(models.Model):
    test = models.ForeignKey(
        Test, related_name="questions", on_delete=models.CASCADE
    )
    text = models.TextField()

    def __str__(self):
        return self.text

class AnswerChoice(models.Model):
    question = models.ForeignKey(
        Question, related_name="answers", on_delete=models.CASCADE
    )
    text = models.CharField(max_length=1000)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.text} ({'✓' if self.is_correct else '✗'})"
