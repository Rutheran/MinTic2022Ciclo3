const newPersonaUrl = "https://minclinica.herokuapp.com/newPersona";

function validate_names(val) {
  const letters = /^[A-Z a-z]+$/;
  if (val.match(letters)) return true;
  else return false;
}

function validate_id(val) {
  if (Number(val) > 1000) return true;
  else return false;
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

function savePersona(data) {
  // Petición HTTP
  fetch(newPersonaUrl, {
    method: "POST",
    headers: {
      "Content-Type": "text/json",
    },
    body: data,
  })
    .then((response) => {
      console.log(response);
      if (response.ok) return response.text();
      else throw new Error(response.text());
    })
    .then((data) => {
      console.log(data);
      handleSuccess();
    })
    .catch((error) => {
      console.error("ERROR: ", error.message);
      //   handleError(error.message);
    });
}

function handleSuccess() {
  // document.getElementById("formData").remove();
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="px-4 py-5 sm:px-6">
  <h3 class="text-lg font-medium leading-6 text-gray-900">Persona creada exitosamente</h3>
</div>
`;
  document.getElementById("success").remove();
  const info = document.getElementById("info");
  info.appendChild(div);
}

// function handleError(msg) {
//   // document.getElementById("formData").remove();
//   const message = document.createElement("p");
//   message.innerText = "No se pudo crear la persona. Intente luego. " + msg;
//   const info = document.getElementById("info");
//   info.appendChild(message);
// }

// --------------------
document.newPerson.addEventListener("submit", collectData);
