from django.urls import path
from . import views

urlpatterns = [
    path('newPaciente', views.newPaciente, name='newPaciente'),
]
