// const loginUrl = "https://minclinica.herokuapp.com/login";
const loginUrl = "http://127.0.0.1:8000/login";

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

async function login(data) {
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

  await fetch(loginUrl, requestOptions)
    .then((response) => {
      console.log(response);
      if (response.ok || response.status == 401) return response.text();
      else throw new Error(response.text());
    })
    .then((data) => {
      console.log(data);
      if (data.includes("Credenciales inválidas.")) {
        handleError(data);
      }
      handleSuccess(JSON.parse(data));
    });
}

function handleSuccess(data) {
  document.getElementById("formLogin").remove();
  const message = document.createElement("p");
  message.innerText = "Ingreso exitoso. Accediendo a su información...";
  const info = document.getElementById("info");
  info.appendChild(message);
  const token = {
    refresh:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY2NDQyNzUzMSwiaWF0IjoxNjY0MzQxMTMxLCJqdGkiOiJkYzc0MzQ5NWJkMmY0NTE1Yjc3MmYwNTgxOTA4YWZlYSIsInVzZXJfaWQiOjExNDQwNTI2MzV9.jPmIU_PLffDeaBhlNa2NXiJLmsTFP1Q-g-iMu_ZKtJU",
    access:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY0MzQxNDMxLCJpYXQiOjE2NjQzNDExMzEsImp0aSI6IjAwZDJkNDcxNGFmODRlNGFiYzRkOGMzNmQ0NzA5NjFhIiwidXNlcl9pZCI6MTE0NDA1MjYzNX0.cDmTpIv6BtqlgZzZFExsB7baRTkleS3t36hCCIWPbDw",
  };
  // console.log(data.access);
  // console.log(data.refresh);
  sessionStorage.setItem("accessToken", data.access);
  sessionStorage.setItem("refreshToken", data.refresh);
  // window.location.href = "./getOnePaciente.html";
}

function handleError(msg) {
  document.getElementById("formLogin").reset();
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
document.login.addEventListener("submit", collectData);
