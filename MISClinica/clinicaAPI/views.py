import datetime
import json
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed

from .models import Familiar, Persona, Paciente, Medico

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

def newPersona(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            persona = Persona(
                id = data["id"],
                firstName = data["firstName"],
                lastName = data["lastName"],
                phone = data["phone"],
                gender = data["gender"],
            )
            persona.save()
            return HttpResponse("Nuevo cliente agregado")
        except:
            return HttpResponseBadRequest("Error en los datos enviados")
    else:
        return HttpResponseNotAllowed(['POST'], "Método inválido")
        
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
            return HttpResponse("Nuevo Paciente Agregado")
        except:
            return HttpResponseBadRequest("Error en los datos enviados")
    else:
        return HttpResponseNotAllowed(['POST'],"Método Inválido")

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
