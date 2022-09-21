const API_URL = "https://minclinica.herokuapp.com/getOnePaciente";
json = [];

async function getAllPacients() {
  await fetch("https://minclinica.herokuapp.com/getAllPacientes")
    // .then((response) => {
      // console.log(response);
// const getValueInput = () => {
//   let id_paciente = document.getElementById("searchId").value;
//   // return id_paciente;

//   document.getElementById("valueInput").innerHTML = id_paciente;
// };

// async function getOnePacient() {
//   let id_paciente = document.getElementById("searchId").value;
//   let API_URL = "http://127.0.0.1:8000/getOnePaciente/" + id_paciente;
//   console.log (API_URL)
//   await fetch(API_URL)
//     .then((response) => {
//       console.log(response);
//       if (response.ok) return response.text();
//       else throw new Error(response.status);
//     })
//     .then((data) => {
//       console.log("Datos: " + data);
//       pacientes = JSON.parse(data);
//       getOnePacient(pacientes);
//     })
//     .catch((error) => {
//       console.error("ERROR: ", error.message);
//       // handleError();
//     });
//   // getOnePacient();
}

async function getOnePacient(pacientes) {
  console.log(pacientes);
  const pacienteId = 1;
  // const parsedUrl = new URL(window.location.href);
  // const id = parsedUrl.searchParams.get("id");
  // console.log(id);

  await fetch(`${API_URL}/${pacienteId}`)
    .then((response) => {
      // console.log(response);
      if (response.ok) return response.text();
      else throw new Error(response.status);
    })
    .then((data) => {
      // console.log(data);
      json = JSON.parse(data);
      handlePaciente(json);
    })
    .catch((error) => {
      console.error("ERROR: ", error.message);
      // handleError();
    });
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

document.addEventListener("DOMContentLoaded", getAllPacients);
