from django.urls import path
from . import views

urlpatterns = [
    path('newFamiliar', views.newFamiliar, name='newFamiliar')
]
