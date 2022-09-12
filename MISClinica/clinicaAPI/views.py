
import json
from urllib import response
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed

# Create your views here.
def getAllPacientes(request):
    if request.method == 'GET':
        pacientes = Paciente.objects.all()
        if (not pacientes):
            return HttpResponseBadRequest("No hay pacientes en la base de datos.")

            allPacientesData = []
            for x in pacientes:
                data = {"id": x.id, "persona": x.persona, "address": x.address, "city": x.city, "birthday": x.birthday, "latitude": x.latitude, "longitude": x.longitude}
                allPacientesData.append(data)
            dataJson = json.dumps(allPacientesData)
            resp = HttpResponse()
            resp.headers['Content-Type'] = "text/jason"
            resp.content = dataJson
            return resp
        else: 
            return HttpResponseNotAllowed(['GET'], "Método inválido")
