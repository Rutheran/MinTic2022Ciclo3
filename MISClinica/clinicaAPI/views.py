import json
from .models import Paciente
from django.shortcuts import render
from http.client import HTTPResponse, HttpResponseBadRequest, HttpResponseNotAllowed

# Create your views here.
def newPaciente(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            paciente = Paciente(
                id_paciente = data["id_paciente"],
                address = data["address"],
                city = data["city"],
                birthday = data["birthday"],
                latitude = data["latitude"],
                longitude = data["longitude"],
            )
            paciente.save()
            return HTTPResponse("Nuevo Paciente Agregado")
        except:
            return HttpResponseBadRequest("Error en los datos enviados")
    else:
        return HttpResponseNotAllowed(['POST'],"Método Inválido")
