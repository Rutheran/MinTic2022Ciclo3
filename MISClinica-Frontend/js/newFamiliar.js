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
    let data = JSON.stringify(familiar);
    saveFamiliar(data)
}

async function saveFamiliar(data) {
    // Petición HTTP
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = data;
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
    await fetch(newFamiliarUrl, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        if (result === "Nuevo familiar agregado") {
          handleSuccess(result);
        } else if (result === "No existe persona con esa cédula.") {
          handleError(result);
        } else if (
          result === "No existe paciente con esa identificación"
        ) {
          handleError(result);
        }
      });
  }
  
  function handleSuccess(msg) {
    document.getElementById("formFamiliar").reset();
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="px-4 py-5 sm:px-6" id="success">
    <h3 class="text-lg font-medium leading-6 text-gray-900 text-center">${msg}</h3>
  </div>
  `;
    document.getElementById("success").remove();
    const info = document.getElementById("info");
    info.appendChild(div);
  }
  
  function handleError(msg) {
    document.getElementById("formFamiliar").reset();
    const div = document.createElement("div");
    div.innerHTML = `
      <div class=" px-4 py-5 sm:px-6" id="success">
      <h3 class="text-lg font-medium leading-6 text-gray-900 text-center">Verifica bien el número de identificación. ${msg}</h3>
    </div>
    `;
    document.getElementById("success").remove();
    const info = document.getElementById("info");
    info.appendChild(div);
  }
// --------------------
document.newFamiliar.addEventListener("submit", collectData);