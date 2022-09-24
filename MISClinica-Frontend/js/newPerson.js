const newPersonaUrl = "https://minclinica.herokuapp.com/newPersona";

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

function collectData(evt) {
  evt.preventDefault();

  const id = document.newPerson.id.value;
  const firstName = document.newPerson.firstName.value.trim();
  const lastName = document.newPerson.lastName.value.trim();
  const phone = document.newPerson.phone.value;
  const gender = document.newPerson.gender.value;

  let result = validate_id(id);
  if (!result) {
    alert("Cédula no es válida");
    return;
  }

  const persona = {
    personaId: id,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    gender: gender,
  };
  console.log(persona);
  const dataToSend = JSON.stringify(persona);
  savePersona(dataToSend);
}

async function savePersona(data) {
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

  await fetch(newPersonaUrl, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      if (result === "Nueva persona agregada") {
        handleSuccess(result);
      } else if (
        result === "Ya existe una persona con ese documento de identidad"
      ) {
        handleError(result);
      }
    });
}

function handleSuccess(msg) {
  document.getElementById("formPerson").reset();
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
  document.getElementById("formPerson").reset();
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
document.newPerson.addEventListener("submit", collectData);
