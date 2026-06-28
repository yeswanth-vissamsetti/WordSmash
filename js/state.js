// =========================
// GAME STATE
// =========================

export const GameState = {

    // Words
    words: [],
    index: 0,

    // Letters
    letters: [],

    // Particles
    particles: [],

    // Player
    score: 0,
    lives: 3,

    // Current word progress
    currentCharIndex: 0,

    // Game state
    running: false,

    // Combo
    combo: 0,
    comboMultiplier: 1,

    // Screen shake
    shakeTime: 0,
    shakeIntensity: 0,

    // Animation
    loopId: null,

    // Timers
    nextWordTimeout: null

};
