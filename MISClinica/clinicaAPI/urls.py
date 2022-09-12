
from django.urls import path
from . import views


urlpatterns = [
    path('getAllPacientes', views.getAllPacientes, name='getAllPacientes'),

]
