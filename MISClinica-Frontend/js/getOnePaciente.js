json = [];

// const getValueInput = () => {
//   let id_paciente = document.getElementById("searchId").value;
//   // return id_paciente;

//   document.getElementById("valueInput").innerHTML = id_paciente;
// };

async function getOnePacient() {
  let id_paciente = document.getElementById("searchId").value;
  let API_URL = "http://127.0.0.1:8000/getOnePaciente/" + id_paciente;
  console.log (API_URL)
  await fetch(API_URL)
    .then((response) => {
      console.log(response);
      if (response.ok) return response.text();
      else throw new Error(response.status);
    })
    .then((data) => {
      console.log(data);
      json = JSON.parse(data);
      // handlePacientes();
    })
    .catch((error) => {
      console.error("ERROR: ", error.message);
      // handleError();
    });
}

// // el erray de los nombres seleccionados
// let seleccionados = [];
// // cada vez que el valor del elemento input cambia
// buscador.addEventListener("input", () => {
//   //vacia el array de los nombres seleccionados
//   seleccionados.length = 0;
//   //para más eficiencia crea un nuevo fragmento
//   let fragment = document.createDocumentFragment();
//   //recuoera el valor del input y guardalo en una variable
//   let x = buscador.value;
//   //si hay un valor
//   if (x.length > 0) {
//     // busca en el json si el nombre incluye (o empieza por) el valor
//     json.forEach((j) => {
//       //if(j.nombre.startsWith(elValor))
//       if (j.id.find(x)) {
//         console.log(x);
//         // si lo incluye agregalo al array de los seleccionados
//         seleccionados.push(j.id);
//       }
//     });
//     //para cada elemento selccionado
//     seleccionados.forEach((s) => {
//       //crea un nuevo elemento p
//       let p = document.createElement("p");
//       //cuyo innerHTML es el nombre seleccionado
//       p.innerHTML = s;
//       //y agregalo al fragmento
//       fragment.appendChild(p);
//     });
//     //vacía el resultado
//     resultado.innerHTML = "";
//     //agrega el fragmento al resultado
//     resultado.appendChild(fragment);
//   }
// });

