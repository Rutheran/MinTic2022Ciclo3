const newPacienteUrl = "https://minclinica.herokuapp.com/newPaciente";

function validate_id(val) {
  if (Number(val) > 1000) return true;
  else return false;
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
    alert("Cédula no es válida");
    return;
  }

  const paciente = {
    pacienteId: id,
    personaId: id,
    address: address,
    city: city,
    birthday: birthday,
    latitude: latitude,
    longitud: longitud,
  };
  console.log(paciente);
  let data = JSON.stringify(paciente);
 
  savePaciente(data);
}

async function savePaciente(data) {
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

  await fetch(newPacienteUrl, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      if (result === "Nuevo paciente agregado") {
        handleSuccess(result);
      } else if (result === "No existe persona con esa cédula.") {
        handleError(result);
      } else if (
        result === "Ya existe un paciente con ese documento de identidad"
      ) {
        handleError(result);
      }
    });
}

function handleSuccess(msg) {
  document.getElementById("formPaciente").reset();
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
  document.getElementById("formPaciente").reset();
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
document.newPaciente.addEventListener("submit", collectData);
