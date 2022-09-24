const newPacienteUrl = 'https://minclinica.herokuapp.com/newPaciente'

function validate_id(val) {
    if (Number(val) > 1000)
        return true;
    else
        return false;
}


function collectData(evt) {
    evt.preventDefault();
    const id = document.newPaciente.id.value;
    const address = document.newPaciente.address.value.trim();
    const city = document.newPaciente.city.value.trim();
    const birthday = document.newPaciente.birthday.value;
    const latitude = document.newPaciente.latitude.value;
    const longitud = document.newPaciente.longitud.value;

    let result = validate_id(id);
    if (!result) {
        alert('Cédula no es válida');
        return;
    }
    
    const paciente = {
        userID: id,
        address: address,
        city: city,
        birthday: birthday,
        latitude: latitude,       
        longitud:longitud
    }
    console.log(paciente);
}

function savePaciente(data) {
    // Petición HTTP
    fetch(newPacienteUrl, {
        method: "POST",
        headers: {
            "Content-Type": "text/json"
        },
        body: data
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
    message.innerText = "Paciente creado exitosamente.";
    const info = document.getElementById("info");
    info.appendChild(message);
}

function handleError(msg) {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerText = "No se pudo crear el paciente. Intente luego. " + msg;
    const info = document.getElementById("info");
    info.appendChild(message);
}

// --------------------
document.newPaciente.addEventListener("submit", collectData);