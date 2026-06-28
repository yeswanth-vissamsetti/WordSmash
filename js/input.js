import { GameState } from "./state.js";
import { spawnParticles } from "./particles.js";
import { triggerShake } from "./effects.js";
import { updateHUD } from "./ui.js";

/*
callbacks = {

    nextWord: function,
    stopGame: function

}
*/

export function initializeInput(canvas, callbacks) {

    canvas.addEventListener("pointerdown", (event) => {

        handleTap(event, canvas, callbacks);

    });

}

// ========================================
// POINTER POSITION
// ========================================

function getPointerPosition(event, canvas) {

    const rect = canvas.getBoundingClientRect();

    const pointer = event.touches
        ? event.touches[0]
        : event;

    return {

        x: pointer.clientX - rect.left,

        y: pointer.clientY - rect.top

    };

}

// ========================================
// HANDLE TAP
// ========================================

function handleTap(event, canvas, callbacks) {

    if (!GameState.running)
        return;

    const pos = getPointerPosition(event, canvas);

    const word =
        GameState.words[GameState.index];

    for (let i = 0; i < GameState.letters.length; i++) {

        const letter = GameState.letters[i];

        const hit =

            pos.x > letter.x - 45 &&
            pos.x < letter.x + 45 &&

            pos.y > letter.y - 45 &&
            pos.y < letter.y + 45;

        if (!hit)
            continue;

        //----------------------------------
        // CORRECT LETTER
        //----------------------------------

        if (

            letter.char ===

            word[GameState.currentCharIndex]

        ) {

            GameState.combo++;

            GameState.comboMultiplier = Math.min(

                5,

                1 + Math.floor(GameState.combo / 5)

            );

            GameState.score +=

                10 *

                GameState.comboMultiplier;

            GameState.currentCharIndex++;

            spawnParticles(

                letter.x,

                letter.y

            );

            GameState.letters.splice(i, 1);

            //----------------------------------
            // WORD COMPLETED
            //----------------------------------

            if (

                GameState.currentCharIndex ===

                word.length

            ) {

                GameState.score +=

                    50 *

                    GameState.comboMultiplier;

                triggerShake(

                    8,

                    12

                );

                if (

                    GameState.nextWordTimeout

                ) {

                    clearTimeout(

                        GameState.nextWordTimeout

                    );

                }

                GameState.nextWordTimeout =

                    setTimeout(

                        callbacks.nextWord,

                        400

                    );

            }

        }

        //----------------------------------
        // WRONG LETTER
        //----------------------------------

        else {

            GameState.lives--;

            GameState.combo = 0;

            GameState.comboMultiplier = 1;

            triggerShake(

                5,

                8

            );

            spawnParticles(

                pos.x,

                pos.y,

                "#ff0000"

            );

            if (

                GameState.lives <= 0

            ) {

                alert("Game Over 😢");

                callbacks.stopGame();

            }

        }

        updateHUD();

        break;

    }

}
