from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed
import json
from .models import Familiar

# Create your views here.
def newFamiliar(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            persona = Persona.objects.filter(id = data["personaId"]).first()
            if (not persona):
                return HttpResponseBadRequest("No existe persona con ese Id")
            paciente = Paciente.objects.filter(id = data["pacienteId"]).first()
            if (not paciente):
                return HttpResponseBadRequest("No existe Paciente con ese Id")    
            
            familiar = Familiar(
                fami = data["number"],
                persona = persona,
                paciente = paciente,
                parentesco = data["parentesco"],
                email = data["email"],               
            )
            familiar.save()
            return HttpResponse("Nueva familiar agregado")
        except:
            return HttpResponseBadRequest("Error en los datos enviados")
    else:
        return HttpResponseNotAllowed(['POST'], "Método inválido")