const API_URL = "https://minclinica.herokuapp.com/getOneMedico/";
const updateMedicoUrl = "https://minclinica.herokuapp.com/updateMedico/";

let id;

function getOnePacient(medico) {
  let id_medico = document.getElementById("searchId").value;

  fetch(`${API_URL}${id_medico}`)
    .then((response) => {
      // console.log(response);
      if (response.ok) return response.text();
      else throw new Error(response.status);
    })
    .then((data) => {
      medico = JSON.parse(data);
      id = medico.id;
      collectValues(medico);
    })
    .catch((error) => {
      alert("Verifica el documento de identidad, no lo encontramos en la BD");
      // console.error("ERROR: ", error.message);
      // handleError();
    });
}

function validate_names(val) {
  const letters = /^[A-Z a-z]+$/;
  if (val.match(letters)) return true;
  else return false;
}

function collectValues(data) {
  // document.getElementById("id").value = data.id;
  document.getElementById("firstName").value = data.firstName;
  document.getElementById("lastName").value = data.lastName;
  document.getElementById("phone").value = data.phone;
  document.getElementById("gender").value = data.gender;
  document.getElementById("especialidad").value = data.especialidad;
  document.getElementById("registro").value = data.registro;

}

function collectData(evt) {
  evt.preventDefault();

  const firstName = document.updateMedico.firstName.value.trim();
  const lastName = document.updateMedico.lastName.value.trim();
  const phone = document.updateMedico.phone.value;
  const gender = document.updateMedico.gender.value;
  const especialidad = document.updateMedico.especialidad.value.trim();
  const registro = document.updateMedico.registro.value.trim();


  const medico = {
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    gender: gender,
    especialidad: especialidad,
    registro: registro,

  };
  console.log(medico);
  const dataToSend = JSON.stringify(medico);
  saveMedico(dataToSend);
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

  await fetch(`${updateMedicoUrl}${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      handleSuccess(result);
      // if (result === "Paciente atualizado") {
      //   handleSuccess(result);
      // }
      // } else if (result === "No existe persona con esa cédula.") {
      //   handleError(result);
      // } else if (result === "Ya se han actualizado los datos ") {
      //   handleError(result);
      // }
    });
}

function handleSuccess(msg) {
  // document.getElementById("formPaciente").reset();
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="px-4 py-5 sm:px-6" id="success">
    <h3 class="text-lg font-medium leading-6 text-gray-900 text-center">${msg}</h3>
  </div>
  `;
  document.getElementById("success").remove();
  const info = document.getElementById("info");
  info.appendChild(div);
  alert("Médico actualizado")
  location.reload();
}

function handleError(msg) {
  document.getElementById("formMédico").reset();
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
document.updateMedico.addEventListener("submit", collectData);
