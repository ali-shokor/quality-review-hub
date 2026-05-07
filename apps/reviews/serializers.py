# Python objects ↔ JSON

from rest_framework import serializers
from .models import Project, Submission, Criterion, Review


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['owner']  # Owner is set from the request user, not from input data

class SubmissionSerializer(serializers.ModelSerializer):
    
    average_score = serializers.SerializerMethodField()

    class Meta:
        model = Submission
        fields = '__all__'

    def get_average_score(self, obj):
        return obj.average_score()


class CriterionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Criterion
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['reviewer']

    def validate(self, data):
        submission = data['submission']

        if submission.project.owner == self.context['request'].user:
            raise serializers.ValidationError(
                "You cannot review your own submission."
            )

        return data
    
    def create(self, validated_data):
        request = self.context['request']
        validated_data['reviewer'] = request.user
        return super().create(validated_data)