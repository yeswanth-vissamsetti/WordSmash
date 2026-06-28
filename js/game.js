import { GameState } from "./state.js";
import { loadWords } from "./words.js";
import {
    updateHUD,
    showGame,
    showMenu,
    showCongrats
} from "./ui.js";





import { updateLetters } from "./physics.js";



import { GameState } from "./state.js";

import { loadWords } from "./words.js";

import {

    updateHUD,
    showGame,
    showMenu,
    showCongrats

} from "./ui.js";

import {

    spawnParticles,
    updateParticles

} from "./particles.js";

import {

    triggerShake

} from "./effects.js";

import {

    clear,
    beginFrame,
    endFrame,
    drawLetters,
    drawParticles

} from "./renderer.js";




const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 600;

// combo
let combo = 0;
let comboMultiplier = 1;

// shake
let shakeTime = 0;
let shakeIntensity = 0;

// loop/timers
let loopId = null;
let nextWordTimeout = null;

// =========================
// STOP GAME SAFE
// =========================
function stopGame() {
    running = false;

    if (loopId) {
        cancelAnimationFrame(loopId);
        loopId = null;
    }

    if (nextWordTimeout) {
        clearTimeout(nextWordTimeout);
        nextWordTimeout = null;
    }
}


// =========================
// START GAME
// =========================
window.startGame = async function (level) {

    document.getElementById("menuScreen").style.display = "none";
    document.getElementById("hud").style.display = "block";
    document.getElementById("congratsScreen").style.display = "none";

    stopGame();

    try {
        const data = await loadWords(level);

       GameState.words = data.sort(() => Math.random() - 0.5).slice(0, 10);

        GameState.index = 0;
        GameState.score = 0;
        GameState.lives = 3;

        combo = 0;
        comboMultiplier = 1;

        GameState.running = true;

        spawn();
        loop();
        updateHUD();

    } catch (e) {
    	console.error(e);
    	alert(e.message);
   	}
};

// =========================
// RESTART
// =========================
window.restartGame = function () {
    stopGame();

    document.getElementById("congratsScreen").style.display = "none";
    document.getElementById("menuScreen").style.display = "flex";
    document.getElementById("hud").style.display = "none";
};

// =========================
// PARTICLES
// =========================
function spawnParticles(x, y, color = "#ff4081") {
    for (let i = 0; i < 14; i++) {
        particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            alpha: 1,
            color
        });
    }
}

// =========================
// SPAWN WORD
// =========================
function spawn() {
    GameState.letters = [];
    currentCharIndex = 0;

    const word = words[index];

    const spacing = 80;
    const startX = (canvas.width - word.length * spacing) / 2;

    for (let i = 0; i < word.length; i++) {
       GameState.letters.push({
            char: word[i],
            x: startX + i * spacing,
            y: 300,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2
        });
    }

    updateHUD();
}

// =========================
// NEXT WORD (FIXED)
// =========================
function nextWord() {

    GameState.index++;

    if (GameState.index >= GameState.words.length) {
        showCongrats();
        return;
    }

    spawn();
}


// =========================
// SHAKE
// =========================
function triggerShake(intensity, time) {
    shakeIntensity = intensity;
    shakeTime = time;
}

// =========================
// LOOP (FIXED REPULSION)
// =========================
function loop() {

    if (!running) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let offsetX = 0;
    let offsetY = 0;

    if (shakeTime > 0) {
        offsetX = (Math.random() - 0.5) * shakeIntensity;
        offsetY = (Math.random() - 0.5) * shakeIntensity;
        shakeTime--;
    }

    ctx.save();
    ctx.translate(offsetX, offsetY);

   // Adding loop by gpt response
function loop() {

    if (!GameState.running)
        return;

    clear(ctx, canvas);
    beginFrame(ctx);
    updateLetters(canvas);
    updateParticles();
    drawParticles(ctx);
    drawLetters(ctx);
    endFrame(ctx);
    GameState.loopId = requestAnimationFrame(loop);

}

    // PARTICLES
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.03;
    });

    particles = particles.filter(p => p.alpha > 0);

    particles.forEach(p => {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.globalAlpha = 1;

    // DRAW LETTERS
    letters.forEach(l => {
        ctx.font = "40px Comic Sans MS";
        ctx.fillStyle = "#ff4081";
        ctx.fillText(l.char, l.x, l.y);
    });

    ctx.restore();

    loopId = requestAnimationFrame(loop);
}

// =========================
// INPUT
// =========================
function getXY(e) {
    const rect = canvas.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;

    return {
        x: t.clientX - rect.left,
        y: t.clientY - rect.top
    };
}

canvas.addEventListener("pointerdown", handleTap);

// =========================
// GAME LOGIC
// =========================
function handleTap(e) {

    const pos = getXY(e);
    const word = words[index];

    for (let i = 0; i < letters.length; i++) {

        const l = letters[i];

        const hit =
            pos.x > l.x - 45 &&
            pos.x < l.x + 45 &&
            pos.y > l.y - 45 &&
            pos.y < l.y + 45;

        if (!hit) continue;

        if (l.char === word[currentCharIndex]) {

            combo++;
            comboMultiplier = Math.min(5, 1 + Math.floor(combo / 5));

            score += 10 * comboMultiplier;
            currentCharIndex++;

            spawnParticles(l.x, l.y);

            letters.splice(i, 1);

            if (currentCharIndex === word.length) {

                score += 50 * comboMultiplier;
                triggerShake(8, 12);

                if (nextWordTimeout) clearTimeout(nextWordTimeout);

                nextWordTimeout = setTimeout(nextWord, 400);
            }

        } else {

            lives--;
            combo = 0;
            comboMultiplier = 1;

            triggerShake(5, 8);
            spawnParticles(pos.x, pos.y, "#ff0000");

            if (lives <= 0) {
                alert("Game Over 😢");
                stopGame();
            }
        }

        updateHUD();
        break;
    }
}
