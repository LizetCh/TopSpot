document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("reg-username").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;


    try {
      const res = await fetch("https://backendtopspot.onrender.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Error: " + err.message);
        return;
      }

      alert("¡Usuario creado! Ahora inicia sesión.");
      window.location.href = "login.html";
    } catch (err) {
      console.error("Error al registrar:", err);
      alert("Hubo un problema al registrarte.");
    }
  });
});
