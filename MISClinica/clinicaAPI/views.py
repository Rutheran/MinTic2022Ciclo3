import json
from urllib import response
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed
from .models import Familiar, Persona, Paciente, Medico, JefeEnfermeria, EnfermeroAuxiliar, Registro

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
                familiar = data["number"],
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

def newRegistro(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            paciente = Paciente.objects.filter(id = data["pacienteId"]).first()
            if (not paciente):
                return HttpResponseBadRequest("No existe Paciente con ese Id")    
            
            registro = Registro(
                registroId = data["number"],
                paciente = paciente,
                signosvitales = data["signosVitales"],
                diagnostico = data["diagnostico"],
                sugerencia = data["sugerencia"],
                historiaClinica = data["historiaClinica"]               
            )
            registro.save()
            return HttpResponse("Nueva registro agregado")
        except:
            return HttpResponseBadRequest("Error en los datos enviados")
    else:
        return HttpResponseNotAllowed(['POST'], "Método inválido")

def getOnePaciente(request, id):
    if request.method == 'GET':
        paciente = Paciente.objects.filter(id = id).first()
        if (not paciente):
            return HttpResponseBadRequest("No existe paciente con esa cédula.")

        persona = Persona.objects.filter(persona = id)
        personaData = []
        for p in persona:
            data = {"id": p.number, "firstName": p.firstName, "lastName": p.lastName, "phone": p.phome, "gender": p.gender}
            personaData.append(data)

        data = {
            "id": paciente.id,
            "persona": personaData,
            "address": paciente.address,
            "city": paciente.city,
            "birthday":paciente.birthday,
            "latitude":paciente.latitude,
            "longitude": paciente.longitude
        }
        dataJson = json.dumps(data)
        resp = HttpResponse()
        resp.headers['Content-Type'] = "text/json"
        resp.content = dataJson
        return resp
    else:
        return HttpResponseNotAllowed(['GET'], "Método inválido")
        
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

def newJefeEnfermeria(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            jefeenfermeria = newJefeEnfermeria(
                id = data["id"],
                paciente = data["paciente"],
                registro = data["registro"]
            )
            jefeenfermeria.save()
            return HttpResponse("Nuevo Jefe Enfermería agregado")
        except:
            return HttpResponseBadRequest("Error en los datos enviados")
    else:
        return HttpResponseNotAllowed(['POST'], "Método inválido")   
        

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

def newEnfermeroAuxiliar(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            paciente = Paciente.objects.filter(id = data["pacienteId"]).first()
            if (not paciente):
                return HttpResponseBadRequest("No existe Paciente con ese Id")
            registro = Registro.objects.filter(id = data["registroId"]).first()
            if (not paciente):
                return HttpResponseBadRequest("No existe Registro con ese Id")

            enfermero = EnfermeroAuxiliar (
                id = data["id"],
                paciente = paciente,
                registro = registro
            )    
            enfermero .save()
            return HttpResponse("Nuevo enfermero auxiliar agregado")
        except:
            return HttpResponseBadRequest("Error en los datos enviados")
    else:
        return HttpResponseNotAllowed(['POST'], "Método inválido")
