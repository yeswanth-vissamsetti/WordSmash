import { GameState } from "./state.js";
import { getShakeOffset } from "./effects.js";

// =========================
// CLEAR
// =========================
export function clear(ctx, canvas) {

    ctx.clearRect(

        0,
        0,

        canvas.width,
        canvas.height

    );

}

// =========================
// DRAW PARTICLES
// =========================
export function drawParticles(ctx) {

    GameState.particles.forEach(p => {

        ctx.globalAlpha = p.alpha;

        ctx.fillStyle = p.color;

        ctx.beginPath();

        ctx.arc(

            p.x,
            p.y,

            4,

            0,

            Math.PI * 2

        );

        ctx.fill();

    });

    ctx.globalAlpha = 1;

}

// =========================
// DRAW LETTERS
// =========================
export function drawLetters(ctx) {

    GameState.letters.forEach(letter => {

        ctx.font = "40px Comic Sans MS";

        ctx.fillStyle = "#ff4081";

        ctx.fillText(

            letter.char,

            letter.x,

            letter.y

        );

    });

}

// =========================
// BEGIN FRAME
// =========================
export function beginFrame(ctx) {

    const shake = getShakeOffset();

    ctx.save();

    ctx.translate(

        shake.x,

        shake.y

    );

}

// =========================
// END FRAME
// =========================
export function endFrame(ctx) {

    ctx.restore();

}
