const API_URL = "https://minclinica.herokuapp.com/getOnePaciente/";
const updatePacienteUrl = "https://minclinica.herokuapp.com/updatePaciente/";

let id;

function getOnePacient(paciente) {
  let id_paciente = document.getElementById("searchId").value;

  fetch(`${API_URL}${id_paciente}`)
    .then((response) => {
      // console.log(response);
      if (response.ok) return response.text();
      else throw new Error(response.status);
    })
    .then((data) => {
      paciente = JSON.parse(data);
      id = paciente.id;
      collectValues(paciente);
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
  document.getElementById("address").value = data.address;
  document.getElementById("city").value = data.city;
  document.getElementById("birthday").value = data.birthday;
  document.getElementById("latitude").value = data.latitude;
  document.getElementById("longitud").value = data.longitud;
}

function collectData(evt) {
  evt.preventDefault();

  const firstName = document.updatePaciente.firstName.value.trim();
  const lastName = document.updatePaciente.lastName.value.trim();
  const phone = document.updatePaciente.phone.value;
  const gender = document.updatePaciente.gender.value;
  const address = document.updatePaciente.address.value.trim();
  const city = document.updatePaciente.city.value.trim();
  const birthday = document.updatePaciente.birthday.value;
  const latitude = document.updatePaciente.latitude.value;
  const longitud = document.updatePaciente.longitud.value;

  const paciente = {
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    gender: gender,
    address: address,
    city: city,
    birthday: birthday,
    latitude: latitude,
    longitud: longitud,
  };
  console.log(paciente);
  const dataToSend = JSON.stringify(paciente);
  savePaciente(dataToSend);
}

async function savePaciente(data) {
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

  await fetch(`${updatePacienteUrl}${id}`, requestOptions)
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
  alert("Paciente actualizado")
  location.reload();
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
document.updatePaciente.addEventListener("submit", collectData);
