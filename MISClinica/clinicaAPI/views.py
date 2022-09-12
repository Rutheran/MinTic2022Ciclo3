import json
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed

# Create your views here.
def newMedico(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            medico = newMedico(
                id = data["id"],
                paciente = data["paciente"],
                registro = data["registro"]
            )
            medico.save()
            return HttpResponse("Nuevo medico agregado")
        except:
            return HttpResponseBadRequest("Error en los datos enviados")
    else:
        return HttpResponseNotAllowed(['POST'], "Método inválido")

