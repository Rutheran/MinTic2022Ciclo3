medicos = [];
// const API_URL = "https://minclinica.herokuapp.com/getAllMedico";
const API_URL = "http://127.0.0.1:8000/getAllMedico";

function getAllMedicos() {
  fetch(API_URL)
    .then((response) => {
      console.log(response);
      if (response.ok) return response.text();
      else throw new Error(response.status);
    })
    .then((data) => {
      console.log("Datos: " + data);
      medicos = JSON.parse(data);
      handleMedicos();
    })
    .catch((error) => {
      console.error("ERROR: ", error.message);
      handleError();
    });
}

function handleMedicos() {
  const divs = [];
  medicos.forEach((medi) => {
    const div = document.createElement("div");
    div.innerHTML = `
    
        <div class="overflow-hidden bg-white shadow sm:rounded-lg w-72">
        <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">${medi.firstName} ${medi.lastName}</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">Nombre completo</p>
        </div>
        <div class="border-t border-gray-200">
            <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Documento de identidad:</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> ${medi.dni}</dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Celular:</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">${medi.phone}</dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Género:</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    ${medi.gender}</dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Dirección:</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">${medi.registro}</dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">Ciudad:</dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">${medi.especialidad}
                    </dd>
                </div>
                

            </dl>
        </div>
    </div>

          `;
    divs.push(div);
  });
  document.getElementById("cargando").remove();
  const info = document.getElementById("info-medicos");
  divs.forEach((div) => info.appendChild(div));
}

function handleError() {
  document.getElementById("cargando").remove();
  const message = document.createElement("p");
  message.innerText = "No se pudo cargar la información. Intente más tarde.";
  const info = document.getElementById("info-medicos");
  info.appendChild(message);
}

document.addEventListener("DOMContentLoaded", getAllMedicos);
