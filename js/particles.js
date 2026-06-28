import { GameState } from "./state.js";

// =========================
// CREATE PARTICLES
// =========================
export function spawnParticles(x, y, color = "#ff4081") {

    for (let i = 0; i < 14; i++) {

        GameState.particles.push({

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
// UPDATE PARTICLES
// =========================
export function updateParticles() {

    GameState.particles.forEach(p => {

        p.x += p.vx;
        p.y += p.vy;

        p.alpha -= 0.03;

    });

    GameState.particles =
        GameState.particles.filter(p => p.alpha > 0);

}
