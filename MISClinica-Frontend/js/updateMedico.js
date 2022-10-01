// const UpdateMedicoUrl = 'https://minclinica.herokuapp.com/UpdateMedico'
const updateMedicoUrl = 'http://127.0.0.1:8000/updateMedico/'

// function validate_id(val) {
//   if (Number(val) > 1000) return true;
//   else return false;
// }


const id = document.updateMedico.id.value;
function collectData(evt) {
  evt.preventDefault();

  const firstName = document.updateMedico.firstName.value.trim();
  const lastName = document.updateMedico.lastName.value.trim();
  const especialidad = document.updateMedico.especialidad.value.trim();
  const registro = document.updateMedico.registro.value.trim();


  // let result = validate_id(id);
  // if (!result) {
  //   alert("Cédula no es válida");
  //   return;
  // }


  const medico = {
    firstName: firstName,
    lastName: lastName,
    especialidad: especialidad,
    registro: registro
  };

  console.log(medico);
  let data = JSON.stringify(medico);
  saveMedico(data)
}

async function saveMedico(data) {
  // Petición HTTP
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = data;

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const id = document.updateMedico.id.value; 
  await fetch(`${updateMedicoUrl}${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      if (result === "Datos de un médico actualizados") {
        handleSuccess(result);
      } else if (result === "Error en la actualización de datos de un médico.") {
        handleError(result);
      }
    });
}

function handleSuccess(msg) {
  // document.getElementById("formMedico").reset();
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
  // document.getElementById("formMedico").reset();
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

function showOldData() {


}



// --------------------
document.updateMedico.addEventListener("submit", collectData);
