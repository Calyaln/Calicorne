import { Emoji } from "./emojis.js";

// GENERAL ELEMENTS
// Music - Theme song
let themeSong = new Audio("./sounds/game.mp3");
themeSong.loop = true;
themeSong.volume = 0.5;

// Sound effect - eating rainbow
let soundEffect = new Audio("./sounds/rainbow.mp3");
soundEffect.volume = 0.1;

// Grid & Player
let unicorn = document.getElementById("unicorn");
let gridColumn = 1;
let gridRow = 15;

// Score
let scoreElement = document.querySelector(".score-value");
let score = 10;

// Create emojis instances
let newStar = new Emoji("star", 1, 1, -1);
let newHeart = new Emoji("heart", 1, 3, -2);
let newGem = new Emoji("gem", 1, 5, -1);
let newFlower = new Emoji("flower", 1, 8, -1);
let newCupcake = new Emoji("cupcake", 1, 12, -2);
let newRainbow = new Emoji("rainbow", 1, 15, 2);

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

function gameLoop(timestamp) {
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

  if (score > 0) frameId = requestAnimationFrame(gameLoop);
  else return cancelAnimationFrame(frameId);
}

frameId = requestAnimationFrame(gameLoop);

// STOP GAME
function checkScore() {
  if (score < 1) {
    score = 0;

    clearEmojis();
    loadGameOver(finishPage);

  } else if (score >= 20) {
    clearEmojis();
    loadCongrats(congratsPage);
  }
}

// CLEAR EMOJIS
function clearEmojis() {
  const emojis = document.querySelectorAll(".emoji");
  emojis.forEach((emoji) => emoji.remove());
}

// LOAD FINISH PAGE
function loadGameOver(finishPage) {
  setTimeout(() => {
    document.querySelector("body").innerHTML = finishPage;
  }, 2000);
}

// LOAD CONGRATS PAGE
function loadCongrats(congratsPage) {
  setTimeout(() => {
    document.querySelector("body").innerHTML = congratsPage;
  }, 2000);
}

// LINK TO GAME OVER PAGE
let finishPage;

try {
  axios.get("./gameover_page.html").then((res) => {
    finishPage = res.data;
  });
} catch(err) {
  console.log(err);
}

// LINK TO CONGRATS PAGE
let congratsPage;

try {
  axios.get("./congrats_page.html").then((res) => {
    congratsPage = res.data;
  });
} catch(err) {
  console.log(err);
}