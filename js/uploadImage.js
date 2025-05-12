// funciones para subir imagenes de perfil y cover
// POR AHORA SOLO SIRVE DE MANERA LOCAL
document.addEventListener("DOMContentLoaded", () => {
  const uploadButton = document.getElementById("upload-btn");

  uploadButton.addEventListener("click", () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const userId = localStorage.getItem("userId");

    if (!file) {
      alert("Selecciona una imagen primero");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", file);
    formData.append("userId", userId);

    fetch("http://localhost:8000/api/users/uploadProfile", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        console.log("Respuesta del servidor:", data);
        localStorage.setItem("profilePic", data.profilePic);
        alert("Imagen subida con éxito");
        

      })
      .catch(error => {
        console.error("Error al subir imagen:", error);
        alert("Error al subir imagen");
      });
  });
});

