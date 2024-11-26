from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'resources', ResourceViewSet)
router.register(r'courses', CourseViewSet)

urlpatterns = [
    path('api/register/', register, name='register'),
    path('api/login/', login_view, name='login'),
    path('api/', include(router.urls)),
    path('api/current-user/', CurrentUserView.as_view(), name='current-user'),
]
