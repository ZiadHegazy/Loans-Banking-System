from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializer import UserSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
def register(request):
    data = request.data
    try:
        existingUser = User.objects.get(username=data['username'])
        if(existingUser):
            return Response({'message':"error", "data":"User Already exists"})
    except Exception as e:
        newUser=User.objects.create(username=data['username'],password=data['password'],role=data['role'])
        serializer = UserSerializer(newUser)
        return JsonResponse({"message":"success",'data': serializer.data})
    
@api_view(['POST'])
def login(request):
    data = request.data
    try:
        user = User.objects.get(username=data['username'],password=data['password'])
        if(user):
            refresh = RefreshToken.for_user(user)
            refresh['custom_payload'] = {"id":user.id,'role': user.role}
            return Response({"message":"success",'data': {"role":user.role,"access_token": str(refresh.access_token), "refresh_token": str(refresh)}})
        else:
            return Response({'message':"error", "data":"Invalid Credentials"})
    except Exception as e:
        return Response({'message':"error", "data":"Invalid Credentials"})