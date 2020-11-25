import {Emoji} from "./emojis.js";


// GENERAL ELEMENTS
// Music
let themeSong = new Audio('../sounds/game.mp3');
themeSong.loop = true;
themeSong.volume = 0.3;


// Grid & Player
let container = document.getElementById('board');
let unicorn = document.getElementById('unicorn');
let gridColumn = 1;
let gridRow = 6;

// Emojis
let star = document.getElementsByClassName('star');
let heart = document.getElementsByClassName('heart');
let gem = document.getElementsByClassName('gem');
let flower = document.getElementsByClassName('flower');
let cupcake = document.getElementsByClassName('cupcake');
let rainbow = document.getElementsByClassName('rainbow');

// Score
let scoreElement = document.querySelector('.score-value');
let score = 20;


// MOVE UNICORN
function moveUnicorn() {

    themeSong.play();

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
let newCupcake = new Emoji ('cupcake', 1, 5, -2);
let newRainbow = new Emoji ('rainbow', 1, 6, 2);


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

function stopInterval() {
    clearInterval(intervalId);
    clearInterval(intervalId2);
}


//CHECK COLLISION & SET SCORE
let soundEffect = new Audio('../rainbow.mp3');
soundEffect.loop = true;
soundEffect.volume = 0.7;


let arrEmojis = [newStar, newHeart, newGem, newFlower, newCupcake, newRainbow];

function checkCollison(array) {

    arrEmojis.forEach(function(emoji) {
        if(emoji.gridRow === gridRow && emoji.gridColumn === gridColumn) {
            score += emoji.point;
            scoreElement.textContent = score;

            if (emoji.point > 0) {
                console.log('yes');
                soundEffect.play();
            } else {
                console.log('no');
            }


            // playSoundEffect() {
            //     //only for the rainbows ???
            // }   
        } 
        return true;
    });
}

let intervalId2 = setInterval(() => {
    checkCollison(arrEmojis);
    checkScore();
}, 200);
// utiliser requestAnimationFrame() pour avoir toutes les collisions 


// STOP GAME & CLEAR EMOJIS
function checkScore() {

    if(score < 1) {
        score = 0;

        stopInterval();

        const emojis = document.querySelectorAll('.emoji');
        emojis.forEach(emoji => emoji.remove());

        setTimeout(() => {document.querySelector('body').innerHTML = finishPage}, 2000);
    }
    return true;
}


// LINK TO FINISH PAGE
let finishPage = '<div class="main-container"><h1 id="gameover"><a href="./index.html">GAME OVER</a></h1><div id="gif"><img src="./images/giphy_finish.gif" alt="adventuretime_gif" ></div><div id="play"><button class="play-btn" type="button"><a href="./game_page.html">Play again!</a></button></div><div id="credit"><p><a href="https://github.com/Calyaln/Calicorne">A game by Calypso Asline</a></p</div></div>';


// To check later :
// axios.get('./finish_page.html').then((res) => {
//     finishPage = res.data;
//     let body = finishPage.indexOf("body");
//     let body2 = finishPage.substring(body+4).indexOf("body")
//         console.log(finishPage.substring(body,body2))
//     });
