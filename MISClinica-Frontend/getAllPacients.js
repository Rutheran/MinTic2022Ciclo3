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

handlePacientes() {
    const divs = [];
    pacientes.forEach ((pasc) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <h3> Documento de identidad: ${pasc.id}</h3>
          <h3> Nombre: ${pasc.firstName}</h3>
          <h3> Apellido: ${pasc.lastName}</h3>
          <h3> Celular: ${pasc.adress}</h3>
          <h3> Adress: ${pasc.adress}</h3>
          <h3> Adress: ${pasc.adress}</h3>
          <h3> City: ${pasc.city}</h3>
          <h3> Birthday: ${pasc.birthday}</h3>
          <h3> Latilude: ${pasc.latitude}</h3>
          <h3> Longitude: ${pasc.longitude}</h3>
          `;
        divs.push(div);
    });
    document.getElementById("Cargando").remove();
    const 
}


