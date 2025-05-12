document.addEventListener("DOMContentLoaded", function () {
  
  API_URL = "https://backendtopspot.onrender.com/api/songs";
  
  let songs = [];

  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      songs = data;
    })
    .catch(err => console.error("Error al obtener canciones:", err));

  const input = document.getElementById("song-search");
  const suggestions = document.getElementById("suggestions");

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    suggestions.innerHTML = "";

    if (query.length === 0) return;

    const matches = songs.filter(song =>
      song.title.toLowerCase().includes(query)
    );

    matches.forEach(song => {
      const li = document.createElement("li");
      li.textContent = song.title;
      li.addEventListener("click", () => {
        input.value = song.title;
        localStorage.setItem("selectedSongId", song._id);
        suggestions.innerHTML = "";
      });
      suggestions.appendChild(li);
    });
  });
});
