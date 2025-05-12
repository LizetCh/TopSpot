document.addEventListener("DOMContentLoaded", () => {

  API_URL = "https://backendtopspot.onrender.com/api/users/login";
  
  // verificar si usuario ya está logueado, redirigir a dashboard
  const userId = localStorage.getItem("userId");
  if (userId) {
    window.location.href = "dashboard.html"; 
  }
  
  const form = document.getElementById("login-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Error: " + err.message);
        return;
      }

      const data = await res.json();
      // Guardar el token en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data._id);

      // Redirigir
      window.location.href = "../templates/dashboard.html";
    } catch (err) {
      console.error("Login error:", err);
      alert("Hubo un problema al iniciar sesión.");
    }
  });
});
