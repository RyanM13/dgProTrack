// index.js
window.addEventListener("DOMContentLoaded", () => {
  window.electronAPI.getPlayerData().then((data) => {
    const fpoList = document.getElementById("fpo-list");
    const mpoList = document.getElementById("mpo-list");

    // Card made by Smit-Prajapati https://uiverse.io/Smit-Prajapati/great-bat-98
    // Function to create a card's HTML for a player
    function createCard(player) {
      return `
    <div class="card-container">
      <div class="card">
        <div class="top-section">
          <div class="border"></div>
          <div class="icons">
            <div class="image" style="background-image: url('${player.image || ""}'); background-size: cover;"></div>
          </div>
        </div>
        <div class="bottom-section">
          <span class="title">${player.name}</span>
          <div class="row row1">
            <div class="item">
              <span class="big-text">${player.Rating || "N/A"}</span>
              <span class="regular-text">Rating</span>
            </div>
            <div class="item">
              <span class="big-text">${player.location || "??"}</span>
              <span class="regular-text">Location</span>
            </div>
            <div class="item">
              <span class="big-text">${player.Wins || ""}</span>
              <span class="regular-text">Wins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
    }

    // Fill the containers with cards
    fpoList.innerHTML = data.fpo.map(createCard).join("");
    mpoList.innerHTML = data.mpo.map(createCard).join("");
  });
});
