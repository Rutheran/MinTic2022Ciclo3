function obtenerToken() {
  const accessToken = sessionStorage.getItem("accessToken");
  // console.log("Tenemos el token en el otro archivo: " + accessToken);
  //   return accessToken;
  if (accessToken === null || accessToken === "") {
    window.location.href = "./login.html";
  }

}

document.getElementById("cerrarSesion").addEventListener("click", () => {
  sessionStorage.setItem("accessToken", "");
  window.location.href = "./login.html";
});

document.addEventListener("DOMContentLoaded", obtenerToken);
