// =========================
// WORD LOADER
// =========================

export async function loadWords(level) {

    const response = await fetch(`words/${level}.txt`);

    if (!response.ok) {
        throw new Error(`Unable to load ${level}.txt`);
    }

    const text = await response.text();

    return text
        .split("\n")
        .map(word => word.trim().toUpperCase())
        .filter(word => word.length > 0);
}
