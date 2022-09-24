const newMedicoUrl = "https://minclinica.herokuapp.com/newMedico";

function validate_id(val) {
  if (Number(val) > 1000) return true;
  else return false;
}

function collectData(evt) {
  evt.preventDefault();
  const id = document.newMedico.id.value;
  const especialidad = document.newMedico.especialidad.value.trim();
  const registro = document.newMedico.registro.value.trim();

  let result = validate_id(id);
  if (!result) {
    alert("Cédula no es válida");
    return;
  }

  const medico = {
    personaId: id,
    medicoId: id,
    especialidad: especialidad,
    registro: registro,
  };
  console.log(medico);
  let data = JSON.stringify(medico);
  saveMedico(data);
}

async function saveMedico(data) {
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

  await fetch(newMedicoUrl, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      if (result === "Nuevo médico agregado") {
        handleSuccess(result);
      } else if (result === "No existe persona con esa cédula.") {
        handleError(result);
      } else if (
        result === "Ya existe un médico con ese documento de identidad"
      ) {
        handleError(result);
      }
    });
}

function handleSuccess(msg) {
  document.getElementById("formMedico").reset();
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
  document.getElementById("formMedico").reset();
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
document.newMedico.addEventListener("submit", collectData);
