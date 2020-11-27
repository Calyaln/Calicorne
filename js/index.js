import { Emoji } from "./emojis.js";

// GENERAL ELEMENTS
// Music - Theme song game page
// let themeSong = document.getElementById("themesong");

let themeSong = new Audio("./../sounds/game.mp3");
themeSong.loop = true;
themeSong.volume = 0.5;

let soundEffect = new Audio("./../sounds/rainbow.mp3");
soundEffect.volume = 0.1;

// Grid & Player
let container = document.getElementById("board");
let unicorn = document.getElementById("unicorn");
let gridColumn = 1;
let gridRow = 15;

// Emojis
let star = document.getElementsByClassName("star");
let heart = document.getElementsByClassName("heart");
let gem = document.getElementsByClassName("gem");
let flower = document.getElementsByClassName("flower");
let cupcake = document.getElementsByClassName("cupcake");
let rainbow = document.getElementsByClassName("rainbow");

// Score
let scoreElement = document.querySelector(".score-value");
let score = 10;

// MOVE UNICORN
function moveUnicorn() {
  themeSong.play();

  switch (window.event.key) {
    case "ArrowLeft":
      if (gridColumn <= 0) {
        gridColumn++;
        unicorn.style.gridColumn = `${gridColumn}`;
      } else {
        gridColumn--;
        unicorn.style.gridColumn = `${gridColumn}`;
        document.getElementById("unicorn").style.transform = "scaleX(1)";
      }
      break;

    case "ArrowRight":
      if (gridColumn >= 15) {
        unicorn.style.gridColumn = 15;
      } else {
        gridColumn++;
        unicorn.style.gridColumn = `${gridColumn}`;
        document.getElementById("unicorn").style.transform = "scaleX(-1)";
      }
      break;
  }
}
window.onkeydown = moveUnicorn;

// CREATE INSTANCES OF EMOJI
let newStar = new Emoji("star", 1, 1, -1);
let newHeart = new Emoji("heart", 1, 3, -2);
let newGem = new Emoji("gem", 1, 5, -1);
let newFlower = new Emoji("flower", 1, 8, -1);
let newCupcake = new Emoji("cupcake", 1, 12, -2);
let newRainbow = new Emoji("rainbow", 1, 15, 2);

//CHECK COLLISION & SET SCORE
let arrEmojis = [newStar, newHeart, newGem, newFlower, newCupcake, newRainbow];

function checkCollison(array) {
  arrEmojis.forEach(function (emoji) {
    if (emoji.gridRow === gridRow && emoji.gridColumn === gridColumn) {
      emoji.gridColumn += 2; // so the condition is false (to enable 60 frame/sec)
      score += emoji.point;
      scoreElement.textContent = score;

      if (emoji.point > 0) {
        soundEffect.play();
      }
      return false;
    }
  });
  return true;
}

// LAUNCH EMOJIS DROP & SPEED
let frameId;
let time = 0;

function step(timestamp) {
  checkCollison(arrEmojis);
  checkScore();

  if (time % 20 === 0) {
    newStar.dropEmoji();
    newHeart.dropEmoji();
    newGem.dropEmoji();
    newFlower.dropEmoji();
    newCupcake.dropEmoji();
    newRainbow.dropEmoji();
  }

  time++;

  if (score > 0) frameId = requestAnimationFrame(step);
  else return cancelAnimationFrame(frameId);
}

frameId = requestAnimationFrame(step);

// STOP GAME
function checkScore() {
  if (score < 1) {
    score = 0;

    clearEmojis();
    loadGameOver();
  }
}

// CLEAR EMOJIS
function clearEmojis() {
  const emojis = document.querySelectorAll(".emoji");
  emojis.forEach((emoji) => emoji.remove());
}

// LOAD FINISH PAGE
function loadGameOver() {
  setTimeout(() => {
    document.querySelector("body").innerHTML = finishPage;
  }, 2000);
}

// LINK TO FINISH PAGE
let finishPage;

axios.get("./finish_page.html").then((res) => {
  finishPage = res.data;
});
