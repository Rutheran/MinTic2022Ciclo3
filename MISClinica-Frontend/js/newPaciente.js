const newPacienteUrl = 'https://minclinica.herokuapp.com/newPaciente'

function validate_id(val) {
    if (Number(val) > 1000)
        return true;
    else
        return false;
}


function collectData(evt) {
    evt.preventDefault();
    const idPersona = document.newPaciente.idPersona.value;
    const address = document.newPaciente.address.value.trim();
    const city = document.newPaciente.city.value.trim();
    const birthday = document.newPaciente.birthday.value;
    const latitude = document.newPaciente.latitude.value;
    const longitud = document.newPaciente.longitud.value;

    let result = validate_id(idPersona);
    if (!result) {
        alert('Cédula no es válida');
        return;
    }
    
    const paciente = {
        pacienteId: idPersona,
        personaId: idPersona,
        address: address,
        city: city,
        birthday: birthday,
        latitude: latitude,       
        longitud:longitud
    }
    console.log(paciente);
    savePaciente(paciente)
}

async function savePaciente(data) {
    // Petición HTTP
    await fetch(newPacienteUrl, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            console.log(response);
            if (response.ok)
                return response.text()
            else
                throw new Error(response.text());
        })
        .then(data => {
            console.log(data);
            handleSuccess();
        })
        .catch(error => {
            console.error("ERROR: ", error);
            handleError(error);
        });
}


function handleSuccess() {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerText = "Paciente creado exitosamente.";
    const info = document.getElementById("info");
    info.appendChild(message);
}

function handleError(msg) {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerText = "Este paciente ya existe en nuestra base de datos";
    const info = document.getElementById("info");
    info.appendChild(message);
}

// --------------------
document.newPaciente.addEventListener("submit", collectData);