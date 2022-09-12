
from django.urls import path
from . import views


urlpatterns = [
    path('medico', views.newMedico, name='medico'),

]
