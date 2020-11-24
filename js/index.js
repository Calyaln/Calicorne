import {Emoji} from "./emojis.js";

// MUSIC
let themeSong = new Audio('../sounds/game.mp3');
themeSong.loop = true;
themeSong.volume = 0.5;
themeSong.play();


// GENERAL ELEMENTS
let container = document.getElementById('board');
let unicorn = document.getElementById('unicorn');
let star = document.getElementsByClassName('star');
let heart = document.getElementsByClassName('heart');
let gem = document.getElementsByClassName('gem');
let flower = document.getElementsByClassName('flower');
let cupcake = document.getElementsByClassName('cupcake');
let rainbow = document.getElementsByClassName('rainbow');
let scoreValue = document.getElementsByClassName('score-value');
let score = 0;

// MOVE UNICORN
let gridColumn = 1;


// function moveLeft() {
//     if(window.event.key === 'ArrowLeft') {
//         if(gridColumn <= 0) {
//             unicorn.style.gridColumn = gridColumn++;
//         } else {
//             unicorn.style.gridColumn = gridColumn--;
//         }
//     }
//     window.onkeydown = moveUnicorn;
// }

// function moveRight() {
//     if (window.event.key === 'ArrowRight') {
//         if(gridColumn >= 6) {
//             unicorn.style.gridColumn = 6;
//         } else {
//             unicorn.style.gridColumn = gridColumn++;
//         }
//     }
//     window.onkeydown = moveUnicorn;
// }

function moveUnicorn() {

    switch (window.event.key) {
        case "ArrowLeft": 
        if(gridColumn <= 0) {
            unicorn.style.gridColumn = gridColumn++;
        } else {
            unicorn.style.gridColumn = gridColumn--;
        }
        break;

        case "ArrowRight": 
        if(gridColumn >= 6) {
            unicorn.style.gridColumn = 6;
        } else {
            unicorn.style.gridColumn = gridColumn++;
        }
        break;
    }
}

window.onkeydown = moveUnicorn;

// CREATE INSTANCES OF EMOJI
let newStar = new Emoji ('star', 1, 1, -1);
let newHeart = new Emoji ('heart', 1, 2, -2);
let newGem = new Emoji ('gem', 1, 3, -1);
let newFlower = new Emoji ('flower', 1, 4, -1);
let newCupcake = new Emoji ('cupcake', 1, 5, -3);
let newRainbow = new Emoji ('rainbow', 1, 6, 1);

//let arrEmojis = [newStar, newHeart, newGem, newFlower, newCupcake, newRainbow];
/*
// CHECK COLLISION
checkCollison(arrEmojis) {
    emojis.forEach(function(emoji) {
        if(emoji.gridRow === gridRow && emoji.gridColum === gridColumn) {
            (if this.emoji === emoji)
    } 
       
// we create a forEach to prevent calling newStar.checkCollision with every emojis

  

    }


    // check true ou false puis incrémenter le score 
}
*/

// KEEP SCORE 



// STOP EMOJI INTERVAL
// function stopEmojiInterval() {
//     clearInterval(intervalId);
// }

// SET EMOJI INTERVAL
let intervalId;

function startInterval() {
    intervalId = setInterval(() => {

        newStar.dropEmoji()
        newHeart.dropEmoji()
        newGem.dropEmoji()
        newFlower.dropEmoji()
        newCupcake.dropEmoji()
        newRainbow.dropEmoji()

    }, 300)
}

startInterval()



