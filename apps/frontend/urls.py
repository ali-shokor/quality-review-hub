from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_page, name='login'),
    path('dashboard/', views.dashboard_page, name='dashboard'),
    path('projects/', views.projects_page, name='projects'),
    path('submissions/', views.submissions_page, name='submissions'),
    path('reviews/', views.reviews_page, name='reviews'),
    path('criteria/', views.criteria_page, name='criteria'),
]
