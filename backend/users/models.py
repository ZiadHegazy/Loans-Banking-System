from django.db import models

# Create your models here.

class User(models.Model):
    username = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=50, default='customer')

