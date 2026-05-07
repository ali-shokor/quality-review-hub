from django.shortcuts import render

def login_page(request):
    return render(request, 'frontend/login.html')

def dashboard_page(request):
    return render(request, 'frontend/dashboard.html')

def projects_page(request):
    return render(request, 'frontend/projects.html')

def submissions_page(request):
    return render(request, 'frontend/submissions.html')

def reviews_page(request):
    return render(request, 'frontend/reviews.html')