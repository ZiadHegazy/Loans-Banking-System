from django.urls import path

from .views import register, login
userUrl=[
    path('users/register', register),
    path('users/login', login),
]