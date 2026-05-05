from django.contrib import admin
from .models import Project, Submission, Criterion, Review

admin.site.register(Project)
admin.site.register(Submission)
admin.site.register(Criterion)
admin.site.register(Review)
