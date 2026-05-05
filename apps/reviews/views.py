from rest_framework import viewsets

from apps.reviews.permissions import IsOwner
from .models import Project, Submission, Criterion, Review
from .serializers import (
    ProjectSerializer,
    SubmissionSerializer,
    CriterionSerializer,
    ReviewSerializer
)

 # ModelViewSet provides default CRUD operations (GET, POST, PUT, DELETE)
from rest_framework.permissions import IsAuthenticated

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, IsOwner]
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)  # Set the owner to the current user
        
class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated, IsOwner]

class CriterionViewSet(viewsets.ModelViewSet):
    queryset = Criterion.objects.all()
    serializer_class = CriterionSerializer
    permission_classes = [IsAuthenticated, IsOwner]

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated, IsOwner]