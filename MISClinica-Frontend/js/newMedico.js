const newMedicoUrl = 'https://minclinica.herokuapp.com/newMedico'

function validate_id(val) {
    if (Number(val) > 1000)
        return true;
    else
        return false;
}


function collectData(evt) {
    evt.preventDefault();
    const id = document.newMedico.id.value;
    const paciente = document.newMedico.idPaciente.value.trim();
    const registro = document.newMedico.registro.value.trim();

    let result = validate_id(id);
    if (!result) {
        alert('Cédula no es válida');
        return;
    }
    
    const medico = {
        personaId: id,
        pacienteId: paciente,
        registro: registro 
    }
    console.log(medico);
    saveMedico(medico)
}

function saveMedico(data) {
    // Petición HTTP
    fetch(newMedicoUrl, {
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
            console.error("ERROR: ", error.message);
            handleError(error.message);
        });
}


function handleSuccess() {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerText = "Medico creado exitosamente.";
    const info = document.getElementById("info");
    info.appendChild(message);
}

function handleError(msg) {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerText = "No se pudo crear el Medico. Intente luego. " + msg;
    const info = document.getElementById("info");
    info.appendChild(message);
}

// --------------------
document.newMedico.addEventListener("submit", collectData);