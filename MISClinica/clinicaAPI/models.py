from operator import mod
from tkinter import CASCADE
from django.db import models

# Create your models here.
class Familiar (models.Model):
    familiar = models.AutoField(primary_key=True)
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE)
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    parentesco = models.CharField(max_length=15)
    email = models.EmailField(max_length=100)

class Registro (models.Model):
    registro = models.AutoField(primary_key=True)
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    signosVitales = models.BigIntegerField()
    diagnostico = models.CharField(max_length=100)
    sugerencia = models.CharField(max_length=50)
    historiaClinica = models.CharField(max_length=255)

class EnfermeroAuxiliar (models.Model):
    enfermeroId = models.AutoField(primary_key=True)
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    registro = models.ForeignKey(Registro, on_delete=models.CASCADE)



