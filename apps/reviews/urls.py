from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet,
    SubmissionViewSet,
    CriterionViewSet,
    ReviewViewSet
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'submissions', SubmissionViewSet)
router.register(r'criteria', CriterionViewSet)
router.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]