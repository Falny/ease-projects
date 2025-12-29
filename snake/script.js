let snakeContainer = document.querySelector(".snake-container"); // main container

let btnStart = document.querySelector(".btn-start");
let scoreBlock = document.querySelector("#block");
let score = document.querySelector(".score");

const MAX_LENGTH = 20; // максимальная дллина доски
let SPEED = 200;

let startX = 0;
let startY = 0;

let press = "right"; // глобальное значение для стрелочек

let lastStep = []; // состояния координат змейки

let gameToggle = false; // отслеживание игры
let count = 0; // подсчет яблок;

let win = false;
let lenSnake = 1;

// иницилизация доски
let desk = Array.from({ length: MAX_LENGTH }, (_) =>
  Array.from({ length: MAX_LENGTH }, (_) => null)
);

// клик по кнопке
btnStart.addEventListener("click", () => onClickStart());
// логика кнопок
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      press = "top";
      break;
    case "ArrowDown":
      press = "bottom";
      break;
    case "ArrowLeft":
      press = "left";
      break;
    case "ArrowRight":
      press = "right";
      break;
    default:
      press = "right";
  }
});

displayApple();

// клик по кнопке и вызов логики игры
function onClickStart() {
  btnStart.style.display = "none";
  displaySnake();
  lastStep.unshift([startY, startX]); // добавляю изначальные координаты
  startGame();
}

function startGame() {
  scoreBlock.classList.remove("inactive");
  scoreBlock.classList.add("score-block");

  let timer = setInterval(() => {
    if (press === "right") startX += 1;
    if (press === "left") startX -= 1;
    if (press === "top") startY -= 1;
    if (press === "bottom") startY += 1;

    // выход за границы
    if (startX > MAX_LENGTH - 1) startX = 0;
    if (startX < 0) startX = MAX_LENGTH - 1;
    if (startY > MAX_LENGTH - 1) startY = 0;
    if (startY < 0) startY = MAX_LENGTH - 1;

    // проверяю на втык в свой же хвост
    lastStep.map((el) => {
      if (el[0] === startY && el[1] === startX) {
        gameToggle = true;
        gameOver();
      }
    });

    if (gameToggle) clearInterval(timer);

    lastStep.unshift([startY, startX]);

    if (desk[startY][startX]) {
      count += 1;
      lenSnake += 1;
      score.textContent = count;
      displayApple(); // при съедении яблока, вызываю новое
    } else {
      let delCell = lastStep.pop(); // удаляю хвостовые координаты при перемещении
      desk[delCell[0]][delCell[1]] = null;
    }

    desk[startY][startX] = false;
    initDesk();
  }, SPEED);
}

function initDesk() {
  let deskD = document.querySelector(".desk");
  deskD.innerHTML = ""; // обновляю доску чтобы она не дублировалась
  deskD.classList.add("desk");

  desk.map((row_) => {
    let row = document.createElement("div");
    row_.map((cell) => {
      let col = document.createElement("div");
      col.classList.add("desk-cell");

      if (cell) {
        col.classList.add("apple");
      }

      if (cell === false) {
        col.classList.add("snake");
      }

      row.appendChild(col);
    });
    row.classList.add("desk-item");
    deskD.appendChild(row);
  });

  snakeContainer.appendChild(deskD);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function displayApple() {
  console.log(lenSnake);
  if (lenSnake === MAX_LENGTH * MAX_LENGTH) {
    win = true;
    gameToggle = true;
    gameOver();
  }

  let rowRandom = getRandomInt(MAX_LENGTH);
  let colRandom = getRandomInt(MAX_LENGTH);

  while (lastStep.some((el) => el[0] === rowRandom && el[1] === colRandom)) {
    rowRandom = getRandomInt(MAX_LENGTH);
    colRandom = getRandomInt(MAX_LENGTH);
  }

  desk[rowRandom][colRandom] = true;
}

function displaySnake() {
  const rowRandom = getRandomInt(MAX_LENGTH);
  const colRandom = getRandomInt(MAX_LENGTH);

  startY = colRandom;
  startX = rowRandom;
}

function gameOver() {
  console.log("1");
  let gameoverContainer = document.createElement("div");
  let gameover = document.createElement("div");
  gameover.classList.add("popup");
  gameoverContainer.classList.add("popup-container");
  let textPopUp1 = document.createElement("p");
  let textPopUp2 = document.createElement("p");

  if (win) {
    textPopUp1.textContent = "Вы выйграли :)";
  } else {
    textPopUp1.textContent = "Вы проиграли :(";
  }

  textPopUp2.textContent = "Перезагрузите страницу";
  textPopUp1.classList.add("text-popup");
  textPopUp2.classList.add("text-popup");
  gameover.appendChild(textPopUp1);
  gameover.appendChild(textPopUp2);
  gameoverContainer.appendChild(gameover);
  document.body.appendChild(gameoverContainer);
}
