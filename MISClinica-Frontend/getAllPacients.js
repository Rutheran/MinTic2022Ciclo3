pacientes = [];

function getAllPacientes(){
    fetch('http://127.0.0.1:8000/getAllPacientes')
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

getAllPacientes ();


