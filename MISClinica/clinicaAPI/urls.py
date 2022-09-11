from django.urls import path
from . import views

urlpatterns = [
    path('newPersona', views.newPersona, name='newPersona'),
]