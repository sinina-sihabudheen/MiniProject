from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer
from rest_framework.views import APIView

from rest_framework.exceptions import AuthenticationFailed

from .models import User
from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from rest_framework.filters import SearchFilter,OrderingFilter




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes=[
        '/api/token',
        '/api/token,refresh',
    ]
    return Response(routes)

class RegisterView(APIView):
    def post(self,request):
        serializer=UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        print('serializer',serializer.data)
        return Response(serializer.data)
    

class LoginView(APIView):
    def post(self,request):
        email=request.data['email']
        password=request.data['password']
        
        user = User.objects.filter(email=email).first()
        
        if user is None:
            raise AuthenticationFailed("User not found..")
        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password..")
        
        return Response({
            'message':'success'
        })

@api_view(['GET'])   
def userList(request):

    users=User.objects.filter(is_superuser=False)
    serializer=UserSerializer(users,many=True)
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields=['id']
    return Response(serializer.data)

@api_view(['GET'])
def userDetails(request,pk):
    try:
        user = User.objects.get(id=pk)
        serializer=UserSerializer(user,many=False)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response("User not found!",status=status.HTTP_404_NOT_FOUND)
    

@api_view(['PUT'])
def userUpdate(request,pk):
    try:
        data=request.data
        user=User.objects.get(id=pk)
        serializer=UserSerializer(user,data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status= status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response("User not found!",status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
def userDelete(request,pk):
    try:
        user = User.objects.exclude(id=1).get(id=pk)
        user.delete()
        return Response('User deleted')
    except User.DoesNotExist:
        return Response("User not found")


class ClassUserList(ListCreateAPIView):
    queryset=User.objects.filter(is_superuser=False)
    serializer_class=UserSerializer
    filter_backends=[SearchFilter]
    search_fields=['username','email']
