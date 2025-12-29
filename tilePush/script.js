let container = document.querySelector(".container");
let desk = document.querySelector(".desk");
// let activeBlock = document.createElement("div"); чтобы не потерять, онициализируется в init()

let COL = 5;
let ROW = 4;
let GAP = 20;
let WIDTHBLOCK = 90;
let HEIGHTBLOCK = 120;

// массив для сбора цветов
let checkColorArr = Array.from({ length: ROW }, (_) =>
  Array.from({ length: COL }, (_) => null)
);

let toggleChooseBlock = false; //  выбрана ли плашка для смены блока

let mainGreyBlock = "rgba(189, 188, 189, 1). rgba(106, 106, 106, 1)";

let colorArray = [
  "rgb(209, 17, 30). rgb(122, 10, 18)",
  "rgb(188, 46, 240). rgb(106, 19, 138)",
  "rgb(39, 35, 252). rgb(23, 21, 164)",
  "rgb(14, 227, 60). rgb(8, 124, 33)",
  "rgb(217, 219, 61). rgb(146, 148, 11)",
  "rgb(219, 119, 61). rgb(182, 94, 43)",
  "rgb(235, 45, 181). rgb(143, 16, 107)",
]; // red, purple, blue, green, yellow, orange, pink,

init();
initDesk();

// логика начала доски
function init() {
  let initArr = colorArray.slice(0, COL); // срезаю массив по количеству блоков, цветов должно быть столько - сколько колонок
  desk.style.gridTemplateColumns = `repeat(${COL}, 1fr)`; // грид по количесву блоков
  desk.style.gridTemplateRows = `repeat(${ROW}, 1fr)`;
  desk.style.gap = `${GAP}px`;

  //заполняю массив цветами
  for (let i = 0; i < COL; i++) {
    for (let y = 0; y < ROW; y++) {
      checkColorArr[y][i] = initArr[i];
    }
  }

  // перемешиваю цвета
  for (let i = 0; i < ROW; i++) {
    checkColorArr[i].sort(() => Math.random() - 0.5);
  }

  // создаю плашку для сдвига остальных плашек
  let activeBlock = document.createElement("div");
  activeBlock.classList.add("block");
  activeBlock.style.width = `${WIDTHBLOCK}px`;
  activeBlock.style.height = `${HEIGHTBLOCK}px`;
  activeBlock.style.backgroundColor = `${mainGreyBlock.split(".")[0]}`;
  activeBlock.style.boxShadow = `5px 5px 5px ${mainGreyBlock.split(".")[1]}`;
  activeBlock.classList.add("block-active");
  container.prepend(activeBlock);

  // let bottomBlock = document.createElement("div");
  // bottomBlock.classList.add("block");
  // bottomBlock.style.width = `${WIDTHBLOCK}px`;
  // bottomBlock.style.height = `${HEIGHTBLOCK}px`;
  // bottomBlock.classList.add("block-bottom");
  // container.append(bottomBlock);
}

// иницилизация доски
function initDesk() {
  for (let i = 0; i < ROW; i++) {
    for (let y = 0; y < COL; y++) {
      let block = document.createElement("div");
      block.style.backgroundColor = `${checkColorArr[i][y].split(".")[0]}`; // такая констукция это вытаскивание цвета из строки
      block.style.boxShadow = `5px 5px 5px ${
        checkColorArr[i][y].split(".")[1]
      }`; // такая констукция это вытаскивание цвета из строки
      block.style.width = `${WIDTHBLOCK}px`;
      block.style.height = `${HEIGHTBLOCK}px`;
      block.dataset.order = y;
      block.classList.add("block");
      block.classList.add("cell");
      desk.append(block);
    }
  }
}

// прорисовка доски
function renderDesk(data) {
  let blocks = document.querySelectorAll(".cell");
  let index = 0; // взаимодействие с массивом блоков, проверки на длину не будет, потому что это бессмысленно

  for (let i = 0; i < ROW; i++) {
    for (let y = 0; y < COL; y++) {
      blocks[index].style.backgroundColor = `${
        checkColorArr[i][y].split(".")[0]
      }`; // такая констукция это вытаскивание цвета из строки
      blocks[index].style.boxShadow = `5px 5px 5px ${
        checkColorArr[i][y].split(".")[1]
      }`; // такая констукция это вытаскивание цвета из строки
      blocks[index].classList.add("block");
      blocks[index].classList.add("cell");

      if (y === data) {
        blocks[index].style.transform = `translateY(${HEIGHTBLOCK + GAP}px)`;
        blocks[index].style.transition = `all .3s ease`;
      }

      index++;
    }
  }
}

function renderdesk2(data) {
  let blocks = document.querySelectorAll(".cell");
  let index = 0; // взаимодействие с массивом блоков, проверки на длину не будет, потому что это бессмысленно

  for (let i = 0; i < ROW; i++) {
    for (let y = 0; y < COL; y++) {
      blocks[index].style.backgroundColor = `${
        checkColorArr[i][y].split(".")[0]
      }`; // такая констукция это вытаскивание цвета из строки
      blocks[index].style.boxShadow = `5px 5px 5px ${
        checkColorArr[i][y].split(".")[1]
      }`; // такая констукция это вытаскивание цвета из строки
      blocks[index].classList.add("block");
      blocks[index].classList.add("cell");

      if (y === data) {
        blocks[index].style.transform = "";
        blocks[index].style.transition = "none";
      }

      index++;
    }
  }
}

function initBloks(saveBlock, data) {
  let bottomBlock = document.querySelector(".block-bottom");
  let activeBlock = document.querySelector(".block-active");

  if (!bottomBlock || bottomBlock === null) {
    bottomBlock = document.createElement("div");
    bottomBlock.classList.add("block");
    bottomBlock.style.width = `${WIDTHBLOCK}px`;
    bottomBlock.style.height = `${HEIGHTBLOCK}px`;
    bottomBlock.classList.add("block-bottom");
    desk.append(bottomBlock);
  }

  bottomBlock.innerHTML = "";
  bottomBlock.append(saveBlock);
  bottomBlock.style.position = `absolute`;
  bottomBlock.style.bottom = `${-(HEIGHTBLOCK + GAP)}px`;
  bottomBlock.style.left = `${data * WIDTHBLOCK + GAP * data}px`;
  bottomBlock.style.backgroundColor = `${saveBlock.split(".")[0]}`;
  bottomBlock.style.boxShadow = `5px 5px 5px ${saveBlock.split(".")[1]}`;
  bottomBlock.textContent = "";

  activeBlock.style.backgroundColor = "";
  activeBlock.style.boxShadow = "none";

  setTimeout(() => {
    bottomBlock.style.backgroundColor = "";
    bottomBlock.style.transition = `none`;
    bottomBlock.style.boxShadow = "none";
    activeBlock.style.transform = "none";

    activeBlock.style.backgroundColor = `${saveBlock.split(".")[0]}`;
    activeBlock.style.boxShadow = `5px 5px 5px ${saveBlock.split(".")[1]}`;
    activeBlock.style.transition = "all .3s ease";
  }, 1000);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function win() {
  // checkColorArr

  let colors = [];
  let count = COL; // потому что я сразу добавляю первую строку в массив colors

  for (let i = 0; i < ROW; i++) {
    for (let y = 0; y < COL; y++) {
      if (i === 0) {
        colors.push(checkColorArr[i][y]);
      }
      if (i > 0) {
        if (colors[y] === checkColorArr[i][y]) {
          count++;
        }
      }
    }
  }

  if (count === COL * ROW) {
    let winContainer = document.createElement("div");
    let winWindow = document.createElement("div");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");

    p1.textContent = "You are win! Congratulations!";
    p2.textContent = "Please, reload the page";

    winContainer.classList.add("win-container");
    winWindow.classList.add("win-window");
    winWindow.append(p1);
    winWindow.append(p2);
    winContainer.append(winWindow);
    container.append(winContainer);
  }
}

document.addEventListener("click", (e) => fn(e));

function fn(e) {
  let blockActive = document.querySelector(".block-active");

  if (e.target.classList.contains("block-active")) {
    e.target.classList.add("active");
    toggleChooseBlock = true;
  } else {
    blockActive.classList.remove("active");
  }

  // если активная плашка и нажат блок то
  if (toggleChooseBlock && e.target.classList.contains("cell")) {
    let data = Number(e.target.dataset.order); // порядок блоков в массиве
    let saveBlock = null;

    let colorActiveBlock = blockActive.style.backgroundColor; // перехватываю цвет активной плашки
    let indexShadow = blockActive.style.boxShadow.indexOf(")") + 1; // :number, нахожу индекс цвета в стиле и обрезаю его
    let shadowActiveBlock = blockActive.style.boxShadow.slice(0, indexShadow); // перехватываю тень активной плашки

    saveBlock = checkColorArr[0][data]; // сохраняю первый блок из изначальной доски
    renderDesk(data);

    // это нужно для анимации перехода активного блока в массив
    // я собираю все блоки и выбираю блок по data, и потом уже смотрю его координаты
    let coordBlock = document
      .querySelectorAll(".cell")
      [data].getBoundingClientRect().left;

    let coordBlockActive = document
      .querySelectorAll(".block-active")[0]
      .getBoundingClientRect().left;

    // плавное перемещение активного блока в массив; 30 это gap контейнера ПОТОМ ИСПРАВИТЬ
    // вычитаю кликнутый блок и активный блок, я не поняла, как это работает, но путем проб и ошибок заработало
    blockActive.style.transform = `translate(${
      coordBlock - coordBlockActive
    }px, ${HEIGHTBLOCK + 30}px)`;

    checkColorArr[0][data] = `${colorActiveBlock}. ${shadowActiveBlock}`; // добавляю активный блок в массив

    for (let i = 1; i < ROW; i++) {
      let toggleBlock = checkColorArr[i][data]; // сохраняю текущий цвет
      checkColorArr[i][data] = saveBlock; // меняю цвет на прошлый цвет блока
      saveBlock = toggleBlock; // присваиваю цвет текущей итерации
      if (i + 1 >= ROW) {
        win();
        break; // проверка внизу для того чтобы блоки окрасились и потом цикл завершился
      }
    }

    setTimeout(() => {
      renderdesk2(data);
      initBloks(saveBlock, data);
    }, 400);
    toggleChooseBlock = false;
  }
}
