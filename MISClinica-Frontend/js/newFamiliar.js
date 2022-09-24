const newFamiliarUrl = 'https://minclinica.herokuapp.com/newFamiliar'

function validate_id(val) {
    if (Number(val) > 1000)
        return true;
    else
        return false;
}


function collectData(evt) {
    evt.preventDefault();
    const id = document.newFamiliar.id.value;
    const paciente = document.newFamiliar.idPaciente.value.trim();
    const parentesco = document.newFamiliar.parentesco.value.trim();
    const email = document.newFamiliar.email.value.trim();


    let result = validate_id(id);
    if (!result) {
        alert('Cédula no es válida');
        return;
    }
    
    const familiar = {
        personaId: id,
        pacienteId: paciente,
        parentesco: parentesco,
        email: email
    }
    console.log(familiar);
    saveFamiliar(familiar)
}

function saveFamiliar(data) {
    // Petición HTTP
    fetch(newFamiliarUrl, {
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
    message.innerText = "Familiar creado exitosamente.";
    const info = document.getElementById("info");
    info.appendChild(message);
}

function handleError(msg) {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerText = "No se pudo crear el Familiar. Intente luego. " + msg;
    const info = document.getElementById("info");
    info.appendChild(message);
}

// --------------------
document.newFamiliar.addEventListener("submit", collectData);