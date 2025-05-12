document.addEventListener("DOMContentLoaded", function () {
  
  const API_URL = "https://backendtopspot.onrender.com/api/reviews";

  // Get reviews
  function getReviews() {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById("reviews-container");
        container.innerHTML = "";

        if (Array.isArray(data)) {
          // invertir el arreglo para mostrar de la más reciente a la más antigua
          data.reverse().forEach(review => {
            const div = document.createElement("div");
            
            const username = review.user?.username || "Usuario";
            const title = review.item?.title || "Título desconocido";
            const artist = review.item?.artist || "";
            const profilePicUrl = review.user.profilePic 
            ? `http://localhost:8000/${review.user.profilePic}`
            : "../img/user-placeholder.jpeg";

            div.innerHTML = `
              <div class="activity-container">
                <div class="user-img-container">
                  <img class="user-img" src=${profilePicUrl} alt="Friend image">
                </div>
                <div class="elipse"></div>
                <div class="elipse2"></div>
                <div class="song-activity-container">
                  <div class="song-img-container">
                    <img class="song-img" src="../img/song-placeholder.png" alt="Song image">
                  </div>
                  <div class="song-info-container">
                    <div class="song-header-container">
                      <p class="user-title">${username}</p>
                      <h3>${title}</h3>
                      <p>${artist}</p>
                    </div>
                    <div class="star-rating2">
                        <p>${review.rating}</p>
                        <img class="star" src="../img/star-filled.png">
                        <img class="star" src="../img/star-filled.png">
                        <img class="star" src="../img/star-filled.png">
                        <img class="star" src="../img/star-filled.png">
                        <img class="star" src="../img/star-filled.png">
                    </div>
                    <p>${review.comment}</p>
                  </div>
                </div>
              </div>
            `;
            container.appendChild(div);
          });

        } else {
          container.innerHTML = "<p>No hay reseñas</p>";
        }
      })
      .catch(error => {
        console.error("Error al obtener reseñas:", error);
        document.getElementById("reviews").innerText =
          "Error al cargar las reseñas.";
      });
  }

  // cargar las reseñas en un inicio
  getReviews();

  // post review
  const form = document.getElementById("song-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const comment = document.getElementById("songComment").value;
    const rating = document.getElementById("songRating").value;
    const selectedSongId = localStorage.getItem("selectedSongId");
    const itemType = 'song';

    if (!selectedSongId) {
      alert("Selecciona una canción");
      return;
    }

    const review = {
      user: localStorage.getItem("userId"),
      itemId: selectedSongId,
      itemType: itemType,
      rating: rating,
      comment: comment
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const result = await res.json();
      console.log("Reseña enviada:", result);

      // actualizar contenedor con reseñas
      getReviews();  

      // limpiar el form
      form.reset();

    } catch (error) {
      console.error("Error al enviar la reseña:", error);
    }
  });
});

