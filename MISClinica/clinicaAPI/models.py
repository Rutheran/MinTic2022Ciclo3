from django.db import models

# Create your models here.
class Familiar (models.Model):
    familiar = models.AutoField(primary_key=True)
    persona = models.ForeignKey(Persona, related_name='persona', on_delete=models.CASCADE)
    paciente = models.ForeignKey(Paciente, related_name='paciente', on_delete=models.CASCADE)
    parentesco = models.CharField(max_length=15)
    email = models.EmailField(max_length=100)