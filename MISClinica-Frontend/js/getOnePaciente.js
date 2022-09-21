const API_URL = "https://minclinica.herokuapp.com/getAllPacientes";
json = [];

async function getOnePacient() {
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

const handleInputChange = (e) => {
  e.preventDefault();
  const id = document.search.id.value;
  console.log (id)
};

document.addEventListener("DOMContentLoaded", handleInputChange);
