import { GameState } from "./state.js";

// =========================
// SCREEN SHAKE
// =========================
export function triggerShake(intensity, duration) {

    GameState.shakeIntensity = intensity;
    GameState.shakeTime = duration;

}

// =========================
// SHAKE OFFSET
// =========================
export function getShakeOffset() {

    if (GameState.shakeTime <= 0) {

        return {

            x: 0,
            y: 0

        };

    }

    GameState.shakeTime--;

    return {

        x: (Math.random() - 0.5) * GameState.shakeIntensity,

        y: (Math.random() - 0.5) * GameState.shakeIntensity

    };

}
