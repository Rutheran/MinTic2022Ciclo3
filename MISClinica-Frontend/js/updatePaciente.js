// const updatePacienteUrl = "https://minclinica.herokuapp.com/updatePaciente";
const updatePacienteUrl = "http://127.0.0.1:8000/updatePaciente/";

function validate_names(val) {
  const letters = /^[A-Z a-z]+$/;
  if (val.match(letters)) return true;
  else return false;
}

function validate_id(val) {
  if (Number(val) > 1000) {
    if (Number(val <= 9999999999)) return true;
  } else return false;
}
const id = document.updatePaciente.id.value; 
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


  let result = validate_id(id);
  if (!result) {
    alert("Cédula no es válida");
    return;
  }

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
    const id = document.updatePaciente.id.value;
    await fetch(`${updatePacienteUrl}${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        if (result === "Paciente atualizado") {
          handleSuccess(result);
        } else if (result === "No existe persona con esa cédula.") {
          handleError(result);
        } else if (
          result === "Ya se han actualizado los datos "
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
  document.updatePaciente.addEventListener("submit", collectData);
