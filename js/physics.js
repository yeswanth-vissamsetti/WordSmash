import { GameState } from "./state.js";

// =========================
// MOVE LETTERS
// =========================
export function updateLetters(canvas) {

    const letters = GameState.letters;

    for (let i = 0; i < letters.length; i++) {

        const a = letters[i];

        // Move
        a.x += a.vx;
        a.y += a.vy;

        // -------------------------
        // Repulsion
        // -------------------------
        for (let j = i + 1; j < letters.length; j++) {

            const b = letters[j];

            const dx = b.x - a.x;
            const dy = b.y - a.y;

            const dist = Math.sqrt(dx * dx + dy * dy);

            const minDist = 70;

            if (dist > 0 && dist < minDist) {

                const overlap = (minDist - dist) / dist;

                const fx = dx * overlap * 0.03;
                const fy = dy * overlap * 0.03;

                a.vx -= fx;
                a.vy -= fy;

                b.vx += fx;
                b.vy += fy;

            }

        }

        // -------------------------
        // Bounce
        // -------------------------
        if (a.x < 50 || a.x > canvas.width - 50) {
            a.vx *= -1;
        }

        if (a.y < 80 || a.y > canvas.height - 50) {
            a.vy *= -1;
        }

        // -------------------------
        // Clamp
        // -------------------------
        a.x = Math.max(
            50,
            Math.min(canvas.width - 50, a.x)
        );

        a.y = Math.max(
            80,
            Math.min(canvas.height - 50, a.y)
        );

    }

}
