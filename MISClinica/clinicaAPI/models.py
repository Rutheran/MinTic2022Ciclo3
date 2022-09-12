from django.db import models

# Create your models here.

class Paciente(models.Model):
    id = models.AutoField(primary_key= True)
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE)
    address = models.CharField(max_length=30)
    city = models.CharField(max_length=20)
    birthday = models.DateField()
    latitude = models.FloatField()
    longitude = models.FloatField()


