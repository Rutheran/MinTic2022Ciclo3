from django.db import models

# Create your models here.

class Medico(models.Model):
    id = models.AutoField(primary_key=True)
    paciente = models.ForeignKey(Persona, related_name='medico', on_delete=models.CASCADE)
    registro = models.ForeingKey(Registro, related_name='medico', on_delete=models.CASCADE)


