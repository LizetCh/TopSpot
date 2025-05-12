
//redirigir al login si no hay userId en localStorage
document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    window.location.href = "login"; 
  } else {
    console.log('Sesión iniciada, userId:', userId);
  }

  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("userId");
      window.location.href = "login.html";
    });
  }

});

