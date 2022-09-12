from django.urls import path
from . import views

urlpatterns = [
    path('newPaciente', views.newPaciente, name='newPaciente'),
    path('newFamiliar', views.newFamiliar, name='newFamiliar'),
    path('newPersona', views.newPersona, name='newPersona'),
]