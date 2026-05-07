# Database models for the reviews app, including Project, Submission, Criterion, and Review.

from django.db import models
from django.contrib.auth.models import User


class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Submission(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_review', 'In Review'),
        ('reviewed', 'Reviewed'),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='submissions')
    title = models.CharField(max_length=255)
    content = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
    def average_score(self):
        reviews = self.reviews.all()

        if not reviews.exists():
            return 0

        total = sum(review.score for review in reviews)

        return total / reviews.count()

class Criterion(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='criteria')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    weight = models.FloatField(default=1.0)

    def __str__(self):
        return f"{self.name} ({self.project.name})"


class Review(models.Model):
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE, related_name='reviews')
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    criterion = models.ForeignKey(Criterion, on_delete=models.CASCADE, related_name='reviews')

    score = models.FloatField()
    feedback = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('submission', 'reviewer', 'criterion')

    def __str__(self):
        return f"{self.reviewer.username} - {self.score}"
