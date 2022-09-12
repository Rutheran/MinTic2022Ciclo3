from django.db import models

# Create your models here.
class Paciente(models.Model):
    id = models.AutoField(primary_key= True)
    persona = models.ForeignKey(Persona, related_name='paciente', on_delete=models.CASCADE)
    address = models.CharField(max_length=30)
    city = models.CharField(max_length=20)
    birthday = models.DateField()
    latitude = models.DecimalField()
    longitude = models.DecimalField()

class JefeEnfermeria(models.Model):
    id = models.AutoField(primary_key=True)
    paciente = models.ForeignKey(Persona, related_name='medico', on_delete=models.CASCADE)
    registro = models.ForeingKey(Registro, related_name='medico', on_delete=models.CASCADE)
