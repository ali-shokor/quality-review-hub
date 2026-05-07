from rest_framework import viewsets

from apps.reviews.permissions import IsOwner
from .models import Project, Submission, Criterion, Review
from .serializers import (
    ProjectSerializer,
    SubmissionSerializer,
    CriterionSerializer,
    ReviewSerializer
)
from rest_framework.decorators import action
from rest_framework.response import Response

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
    permission_classes = [IsAuthenticated] # Here it checks if the user is authenticated, if its not it will exist here

    def get_queryset(self):
        queryset = Submission.objects.all()

        status_param = self.request.query_params.get('status')

        if status_param:
            queryset = queryset.filter(status=status_param)

        return queryset
    
    @action(detail=False, methods=['get'])
    def pending(self, request):
        pending_count = Submission.objects.filter(
            status='pending'
        ).count()

        return Response({
            'pending_reviews': pending_count
        })

class CriterionViewSet(viewsets.ModelViewSet):
    queryset = Criterion.objects.all()
    serializer_class = CriterionSerializer
    permission_classes = [IsAuthenticated]

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        serializer.save(reviewer=self.request.user)