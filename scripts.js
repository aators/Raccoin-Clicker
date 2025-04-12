// Alustetaan kolikot localStoragesta
let coins = parseInt(localStorage.getItem("coins") || "0"); // Haetaan tallennetut kolikot tai nollataan ne
let musicOn = true;
let soundsOn = true;

// Päivitetään UI:ssa näkyvät kolikot heti alussa
document.getElementById("coins").textContent = coins; // Tämä päivittää pääsivun kolikot
document.getElementById("coins_wallet").textContent = coins; // Tämä päivittää pop-upin

// Aloita peli
function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("content").style.display = "block";

  // Aloita musiikki, jos se on päällä
  const music = document.getElementById("music");
  music.volume = 0.5;
  if (musicOn) {
    music.play();
  }
}

// Kolikon ansaitseminen
function earnCoin() {
  coins++; // Lisätään kolikko
  localStorage.setItem("coins", coins); // Tallennetaan pistemäärä localStorageen

  // Päivitetään UI:ssa näkyvät kolikot
  document.getElementById("coins").textContent = coins; // Päivitetään pääsivun kolikkojen määrä
  document.getElementById("coins_wallet").textContent = coins; // Päivitetään pop-upin kolikot

  spawnParticles(); // Luodaan visuaaliset partikkeleita

  if (soundsOn) {
    // Soita ääni, jos se on päällä
  }
}

// Luodaan visuaaliset partikkeleita
function spawnParticles() {
  const container = document.getElementById("particles");
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    container.appendChild(particle);
    setTimeout(() => container.removeChild(particle), 1000);
  }
}

// Popupin näkyvyyden vaihtaminen
function togglePopup(id) {
  document.querySelectorAll('.popup').forEach(p => {
    p.style.display = 'none';
  });

  const popup = document.getElementById(id);
  if (popup.style.display !== 'block') {
    popup.style.display = 'block';
  }
}

// Sulje popup
function closePopup(id) {
  const popup = document.getElementById(id);
  popup.style.display = 'none';
}

// Musiikin vaihto
function toggleMusic() {
  musicOn = !musicOn;
  document.getElementById("musicStatus").textContent = musicOn ? "ON" : "OFF";
  const music = document.getElementById("music");
  music.volume = 0.5;
  musicOn ? music.play() : music.pause();
}

// Äänien vaihto
function toggleSounds() {
  soundsOn = !soundsOn;
  document.getElementById("soundStatus").textContent = soundsOn ? "ON" : "OFF";
}

// Avaa peli uuteen ikkunaan
function openGame(gameURL) {
  window.open(gameURL, '_blank');
}
