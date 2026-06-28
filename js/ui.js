import { GameState } from "./state.js";

// =========================
// HUD
// =========================

export function updateHUD() {

    document.getElementById("score").textContent =
        GameState.score;

    document.getElementById("lives").textContent =
        GameState.lives;

    document.getElementById("word").textContent =
        GameState.words[GameState.index] || "";

}

// =========================
// MENU
// =========================

export function showMenu() {

    document.getElementById("menuScreen").style.display = "flex";

    document.getElementById("hud").style.display = "none";

    document.getElementById("congratsScreen").style.display = "none";

}

// =========================
// GAME
// =========================

export function showGame() {

    document.getElementById("menuScreen").style.display = "none";

    document.getElementById("hud").style.display = "block";

    document.getElementById("congratsScreen").style.display = "none";

}

// =========================
// CONGRATS
// =========================

export function showCongrats() {

    document.getElementById("hud").style.display = "none";

    document.getElementById("congratsScreen").style.display = "flex";

}
