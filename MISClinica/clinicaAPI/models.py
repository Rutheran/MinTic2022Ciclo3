from operator import mod
from tkinter import CASCADE
from django.db import models

class Persona(models.Model):
    id = models.BigIntegerField(primary_key=True)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    phone = models.BigIntegerField()
    gender = models.CharField(max_length=10)
    
class Paciente(models.Model):
    id = models.AutoField(primary_key= True)
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE)
    address = models.CharField(max_length=30)
    city = models.CharField(max_length=20)
    birthday = models.DateField()
    latitude = models.FloatField()
    longitude = models.FloatField()

class Familiar (models.Model):
    id = models.AutoField(primary_key=True)
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE)
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    parentesco = models.CharField(max_length=15)
    email = models.EmailField()

class Registro (models.Model):
    id = models.AutoField(primary_key=True)
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    signosVitales = models.BigIntegerField()
    diagnostico = models.CharField(max_length=100)
    sugerencia = models.CharField(max_length=50)
    historiaClinica = models.CharField(max_length=255)

class JefeEnfermeria(models.Model):
    id = models.AutoField(primary_key=True)
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    registro = models.ForeingKey(Registro, on_delete=models.CASCADE)

class EnfermeroAuxiliar (models.Model):
    id = models.AutoField(primary_key=True)
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    registro = models.ForeignKey(Registro, on_delete=models.CASCADE)
    

class Medico(models.Model):
    id = models.AutoField(primary_key=True)
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    registro = models.ForeingKey(Registro, on_delete=models.CASCADE)


