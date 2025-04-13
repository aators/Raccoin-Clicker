const rooms = [
  { name: "Makuuhuone", background: "makuuhuone.jpg", glow: true },
  { name: "Keittiö", background: "keittio.jpg", glow: false },
  { name: "Suihku", background: "suihku.jpg", glow: false },
  { name: "Olohuone", background: "olohuone.jpg", glow: false }
];

let currentRoom = 0;

function updateRoom() {
  const room = rooms[currentRoom];
  document.getElementById("top-bar").innerText = room.name;
  document.getElementById("room-container").style.backgroundImage = `url('${room.background}')`;

  const raccoon = document.getElementById("raccoon");
  if (room.glow) {
    raccoon.style.boxShadow = "0 0 20px red";
  } else {
    raccoon.style.boxShadow = "none";
  }
}

function nextRoom() {
  currentRoom = (currentRoom + 1) % rooms.length;
  updateRoom();
}

function previousRoom() {
  currentRoom = (currentRoom - 1 + rooms.length) % rooms.length;
  updateRoom();
}

function petRaccoon() {
  const raccoon = document.getElementById("raccoon");
  raccoon.style.transform = "translate(-50%, -50%) scale(1.05)";
  raccoon.style.filter = "brightness(1.4)";
  setTimeout(() => {
    raccoon.style.transform = "translate(-50%, -50%) scale(1)";
    raccoon.style.filter = "brightness(1.2)";
  }, 500);
}

function feedRaccoon() {
  const food = document.createElement("img");
  food.src = "pizza.png"; // käytä omaa ruokatiedostoa
  food.style.position = "absolute";
  food.style.left = "50%";
  food.style.top = "60%";
  food.style.transform = "translate(-50%, -50%)";
  food.style.maxHeight = "100px";
  food.style.zIndex = 3;
  document.body.appendChild(food);

  const raccoon = document.getElementById("raccoon");
  raccoon.style.transform = "translate(-50%, -50%) scale(1.1)";
  setTimeout(() => {
    document.body.removeChild(food);
    raccoon.style.transform = "translate(-50%, -50%) scale(1)";
  }, 800);
}

window.onload = updateRoom;
