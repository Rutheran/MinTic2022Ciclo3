from django.urls import path
from . import views

urlpatterns = [
    path('newFamiliar', views.newFamiliar, name='newFamiliar'),
    path('newEnfermeroAuxiliar', views.newEnfermeroAuxiliar , name='newEnfermeroAuxiliar'),
    path('newRegistro', views.newRegistro , name='newRegistro')
]
