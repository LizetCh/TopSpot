
//redirigir al login si no hay userId en localStorage
document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    window.location.href = "login.html"; 
  } else {
    console.log('Sesión iniciada, userId:', userId);
  }

  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("profilePic");
      window.location.href = "login.html";
    });
  }



  // Función para cargar la imagen de perfil
  const profilePic = localStorage.getItem("profilePic");
  const profilePicElement = document.getElementById("profile-pic");

  if (profilePic && profilePicElement) {
    profilePicElement.src = `http://localhost:8000/${profilePic}`;
  }
  if (!profilePic) {
    profilePicElement.src = "../img/user-placeholder.jpeg";
  }

});

