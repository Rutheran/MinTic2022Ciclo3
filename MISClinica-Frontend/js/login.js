const loginUrl = "https://minclinica.herokuapp.com/login";
// const loginUrl = "http://127.0.0.1:8000/login";

function collectData(evt) {
  evt.preventDefault();
  const id = document.login.id.value;
  const password = document.login.password.value.trim();

  const auxEnf = {
    id: id,
    password: password,
  };
  console.log(auxEnf);
  let data = JSON.stringify(auxEnf);
  login(data);
}

function login(data) {
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

  fetch(loginUrl, requestOptions)
    .then((response) => {
      console.log(response);
      if (response.ok || response.status == 401) return response.text();
      else throw new Error(response.text());
    })
    .then((data) => {
      const dataJson = JSON.parse(data);
      if (data.includes("Credenciales inválidas.")) {
        handleError(data);
      }
      console.log (dataJson.detail)
      
      if (
        dataJson.detail === "No active account found with the given credentials"
      ) {
        handleError("Usuario o contraseña errados");
      }

      if (dataJson.refresh) {

        handleSuccess(dataJson);
      }
    });
}

function handleSuccess(data) {
  document.getElementById("formLogin").remove();
  const message = document.createElement("p");
  message.innerText = "Ingreso exitoso. Accediendo a su información...";
  const info = document.getElementById("info");
  info.appendChild(message);
  sessionStorage.setItem("accessToken", data.access);
  sessionStorage.setItem("refreshToken", data.refresh);
  window.location.href = "./index.html";
}

function handleError(msg) {
  document.getElementById("formLogin").reset();
  const div = document.createElement("div");
  div.innerHTML = `
    <div class=" px-4 py-5 sm:px-6" id="success">
    <h3 class="text-lg font-medium leading-6 text-gray-900 text-center">Verifica bien tu información.</h3>
    <h3 class="text-lg font-medium leading-6 text-gray-900 text-center">${msg}</h3>
  </div>
  `;
  document.getElementById("success").remove();
  const info = document.getElementById("info");
  info.appendChild(div);
}

// --------------------
document.login.addEventListener("submit", collectData);
