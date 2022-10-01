const API_URL = "https://minclinica.herokuapp.com/getOnePaciente/";

json = [];



function getOnePacient(pacientes) {
  let id_paciente = document.getElementById("searchId").value;

  const accessToken = sessionStorage.getItem("accessToken");
  
  fetch(`${API_URL}${id_paciente}`, {
    header: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      // console.log(response);
      if (response.ok) return response.text();
      else throw new Error(response.status);
    })
    .then((data) => {
      // console.log("Datos: " + data);
      pacientes = JSON.parse(data);
      handlePaciente(pacientes);
    })
    .catch((error) => {
      console.error("ERROR: ", error.message);
      // handleError();
    });
}

const handlePaciente = (pasc) => {
  const pacDiv = document.createElement("div");
  pacDiv.innerHTML = `

  <div class="overflow-hidden bg-white shadow sm:rounded-lg w-72">
  <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">${pasc.firstName} ${pasc.lastName}</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">Nombre completo</p>
  </div>
  <div class="border-t border-gray-200">
      <dl>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Documento de identidad:</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> ${pasc.dni}</dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Celular:</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">${pasc.phone}</dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Género:</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              ${pasc.gender}</dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Dirección:</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">${pasc.address}</dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Ciudad:</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">${pasc.city}
              </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Cumpleaños:</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">${pasc.birthday}</dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Latitude:</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">${pasc.latitude}
              </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Logitud:</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">${pasc.longitud}</dd>
          </div>

      </dl>
  </div>
</div>
  `;
  document.getElementById("cargando").remove();
  const info = document.getElementById("info-pacientes");
  info.appendChild(pacDiv);
};

