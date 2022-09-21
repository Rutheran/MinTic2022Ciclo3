const API_URL = "https://minclinica.herokuapp.com/getOnePaciente/";
json = [];

async function getAllPacients() {
  await fetch("https://minclinica.herokuapp.com/getAllPacientes")
    .then((response) => {
      // console.log(response);
      if (response.ok) return response.text();
      else throw new Error(response.status);
    })
    .then((data) => {
      pacientes = JSON.parse(data);
      // console.log(pacientes);
      getOnePacient(pacientes);
    })
    .catch((error) => {
      console.error("ERROR: ", error.message);
      handleError();
    });
}

async function getOnePacient(pacientes) {
  let id_paciente = document.getElementById("searchId").value;

  function filterByID(paciente) {
    if (paciente.dni == id_paciente) {
      return true;
    }
    return false;
  }

  const filteredPaciente = pacientes.filter(filterByID)[0];
  // console.log (filteredPaciente)

  await fetch(`${API_URL}${filteredPaciente.id}`)
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
  // getOnePacient();
}

const handlePaciente = (paciente) => {
  const pacDiv = document.createElement("div");
  pacDiv.innerHTML = `
    <h3> Cédula: ${paciente.id} </h3>
    <h3> Nombre ${paciente.firstName} </h3>
    <h3> Apellido ${paciente.lastName} </h3>
    <h3> Teléfono ${paciente.phone} </h3>
    <h3> Género ${paciente.gender} </h3>
    <h3> Dirección ${paciente.address} </h3>
    <h3> Ciudad ${paciente.city} </h3>
    <h3> Cumpleaños ${paciente.birthday} </h3>
  `;
  document.getElementById("cargando").remove();
  const info = document.getElementById("info-pacientes");
  info.appendChild(pacDiv);
};
