from rest_framework import viewsets
from .models import User
from .models import *
from .serializers import *
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.utils.translation import gettext as _
from rest_framework.authtoken.views import ObtainAuthToken

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message': 'User registered successfully',
            'data': {
                'id': user.id,
                'username': user.username,
                'email': user.email,  # Include email if needed
            }
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class login_view(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        # Extract username and password
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate user
        user = authenticate(username=username, password=password)

        if user is not None:
            # Get or create token
            token, created = Token.objects.get_or_create(user=user)
            data = {
                'user_id': user.id,
                'username': user.username,
                'role': getattr(user, 'role', None)  # Include role if applicable
            }
            # Return token and user information
            return Response({
                'token': token.key,
                'message': 'Login Successful',
                'data' : data,
            })
        else:
            # Return an error response if authentication fails
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get(self, request):
        user = request.user  # Get the current logged-in user
        serializer = UserSerializer(user)  # Serialize the user data
        return Response(serializer.data)  # Return the serialized data

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer