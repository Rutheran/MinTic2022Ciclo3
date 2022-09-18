pacientes = [];

async function  getAllPacients(){
    await fetch('http://127.0.0.1:8000/getAllPacientes')
    .then(response => {
        console.log (response);
        if (response.ok)
           return response.text()
        else
           throw new Error (response.status);
    } )
    .then(data => {
        console.log("Datos: "+ data);
        pacientes = JSON.parse(data);
        handlePacientes();
    })
    .catch(error =>{
        console.error("ERROR: ", error.message);
        handleError();
    });
}

function handlePacientes(){
    const divs = [];
    pacientes.forEach ((pasc) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <h3> Documento de identidad: ${pasc.id}</h3>
          <h3> Nombre: ${pasc.firstName}</h3>
          <h3> Apellido: ${pasc.lastName}</h3>
          <h3> Celular: ${pasc.phone}</h3>
          <h3> Genero: ${pasc.gender}</h3>
          <h3> Dirección: ${pasc.address}</h3>
          <h3> Ciudad: ${pasc.city}</h3>
          <h3> Cumpleaños: ${pasc.birthday}</h3>
          <h3> Latitud: ${pasc.latitude}</h3>
          <h3> Longitud: ${pasc.longitud}</h3>
          `;
        divs.push(div);
    });
    document.getElementById("cargando").remove();
    const info = document.getElementById("info-pacientes");
    divs.forEach(div => info.appendChild(div)); 
}

function handleError(){
    document.getElementById("cargando").remove();
    const message = document.createElement("p");
    message.innerText = "No se pudo cargar la información. Intente más tarde.";
    const info = document.getElementById("info-pacientes");
    info.appendChild(message);
}


document.addEventListener("DOMContentLoaded",getAllPacients);