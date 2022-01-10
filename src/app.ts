import { MenuItem } from "./components/menu-item";
import { Item } from "./model/item";
import { ItemList } from "./model/item-list";
import { IdPool } from "./utils/item-id-pool";
import { LightDarkMode } from "./utils/light-dark-mode";
import { avaliableRGBs } from "./utils/utils";

const addButtonEl = document.getElementsByClassName(
  "add-item-button"
)[0]! as HTMLButtonElement;
const inputEl = document.querySelector("input")! as HTMLInputElement;
const itemListEl = document.getElementsByClassName(
  "menu-item-list"
)[0]! as HTMLUListElement;
const counterEl = document.getElementsByClassName(
  "counter"
)[0]! as HTMLParagraphElement;
const removeAllItemsButtonEl = document.getElementsByClassName(
  "remove-all-items-button"
)[0]! as HTMLButtonElement;
const lightDarkModeEl = document.getElementsByClassName(
  "light-dark-mode"
)[0]! as HTMLDivElement;
const canvasEl = document.querySelector("canvas")! as HTMLCanvasElement;
const ctx = canvasEl.getContext("2d")!;
const bodyEl = document.querySelector("body")! as HTMLBodyElement;
const modeEl = lightDarkModeEl.querySelector("img")! as HTMLImageElement;
const canvasWrapper = document.getElementsByClassName(
  "roulette-wheel"
)[0]! as HTMLDivElement;
const winnerEl = document.getElementsByClassName(
  "winner"
)[0]! as HTMLDivElement;

canvasEl.width = canvasWrapper.offsetWidth;
canvasEl.height = canvasWrapper.offsetHeight;

const MAXIMUM_SIZE = 16;
const ROTATIONS = 20;
const ANIMATION_FPS = 60;
const WHEEL_OFFSET = 5;
const X_CENTER = canvasEl.width / 2;
const Y_CENTER = canvasEl.height / 2;
const RADIUS = canvasEl.height / 2 - WHEEL_OFFSET;

const itemsList = new ItemList(MAXIMUM_SIZE);
const items: MenuItem[] = [];

let rotate_by = 50;

configure();

function configure() {
  counterEl.textContent = `0/${MAXIMUM_SIZE}`;
  winnerEl.style.fontSize = "32px";

  LightDarkMode.currentMode = "dark";
  IdPool.initializeIdsPool(MAXIMUM_SIZE);
  addRemoveItem();
  addItemByEnter();
  removeAllItems();
  lightDarkMode();
  drawRouletteWheel(0);

  canvasEl.addEventListener("click", startRoulette);
}

function addRemoveItem() {
  addButtonEl.addEventListener("click", () => {
    const name = inputEl.value;
    if (name) {
      const id = IdPool.getAnId();
      if (id) {
        const color = avaliableRGBs[id % avaliableRGBs.length];
        const item = new Item(id, name, color);
        const menuItem = new MenuItem(id, name, color);

        menuItem.deleteItem.el.addEventListener("click", () => {
          menuItem.el.remove();
          items.splice(items.indexOf(menuItem), 1);
          itemsList.remove(item);
          IdPool.addId(item.id);
          updateCounter();
          drawRouletteWheel(0);
        });

        registerChangeColorByClick(item, menuItem);

        itemsList.add(item);
        items.push(menuItem);
        itemListEl.appendChild(menuItem.el);
        updateCounter();
        guessItemIndex = Math.floor(Math.random() * items.length);
        segmentAngle = 360 / items.length;
        maxAngle = 360 * ROTATIONS + segmentAngle * guessItemIndex;
        drawRouletteWheel(0);
      }
    }
  });
}

function addItemByEnter() {
  bodyEl.addEventListener("keyup", (event: KeyboardEvent) => {
    if (event.key !== "Enter") return;
    addButtonEl.click();
  });
}

function registerChangeColorByClick(item: Item, menuItem: MenuItem) {
  menuItem.el.addEventListener("click", () => {
    const actualColorIndex = avaliableRGBs.indexOf(
      menuItem.el.style.backgroundColor
    );
    if (actualColorIndex !== -1) {
      const color =
        avaliableRGBs[(actualColorIndex + 1) % avaliableRGBs.length];
      menuItem.el.style.backgroundColor = color;
      item.color = color;
      if (!animationId) drawRouletteWheel(0);
    }
  });
}

function removeAllItems() {
  removeAllItemsButtonEl.addEventListener("click", () => {
    if (items.length > 0) {
      items.forEach((menuItem) => menuItem.el.remove());
      items.length = 0;
      itemsList.clear();
      IdPool.initializeIdsPool(MAXIMUM_SIZE);
      updateCounter();
      drawRouletteWheel(0);
    }
  });
}

function updateCounter() {
  counterEl.textContent = `${itemsList.items.length}/${MAXIMUM_SIZE}`;
  animateCounter();
}

function animateCounter() {
  counterEl.animate(
    [
      { transform: "scale(1.5)" },
      { transform: "scale(1.00)" },
      { transform: "" },
    ],
    {
      duration: 500,
    }
  );
}

function animateWinner() {
  winnerEl.animate(
    {
      opacity: [0.5, 1],
      easing: ["ease-in", "ease-out"],
    },
    1000
  );
}

function lightDarkMode() {
  lightDarkModeEl.addEventListener("click", () => {
    modeEl.animate([{ transform: "rotate(360deg)" }], {
      duration: 500,
    });

    if (LightDarkMode.currentMode == "dark") {
      modeEl.src = "static/sun.png";
      bodyEl.style.backgroundColor = "#FAF9F6";
      bodyEl.style.color = "black";
    } else {
      modeEl.src = "static/moon.png";
      bodyEl.style.backgroundColor = "#121212";
      bodyEl.style.color = "white";
    }
    LightDarkMode.changeMode();
  });
}

function drawRouletteWheel(angle: number) {
  const segmentWidth = 360 / items.length;
  let startAngle = angle;
  let endAngle = segmentWidth + startAngle;
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  ctx.beginPath();
  ctx.save();
  ctx.translate(X_CENTER + RADIUS + 50, Y_CENTER);
  ctx.lineTo(0, -20);
  ctx.lineTo(0, 20);
  ctx.lineTo(-50, 0);
  ctx.fillStyle = "#C4B454";
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.arc(X_CENTER, Y_CENTER, RADIUS, 0, Math.PI * 2, true);
  ctx.stroke();
  for (let i = 0; i < items.length; i++) {
    ctx.beginPath();
    ctx.lineTo(X_CENTER, Y_CENTER);
    ctx.font = "bold 24px verdana, sans-serif";
    ctx.arc(
      X_CENTER,
      Y_CENTER,
      RADIUS,
      (startAngle * Math.PI) / 180,
      (endAngle * Math.PI) / 180,
      false
    );
    ctx.lineTo(X_CENTER, Y_CENTER);
    ctx.fillStyle = itemsList.items[i].color;
    ctx.fill();
    ctx.save();
    ctx.fillStyle = "black";
    const text = itemsList.items[i].name;
    if (items.length > 1) {
      const angleVal = ((startAngle + segmentWidth / 2) * Math.PI) / 180;
      const xT = X_CENTER + (Math.cos(angleVal) * RADIUS) / 2;
      const xY = Y_CENTER + (Math.sin(angleVal) * RADIUS) / 2;
      ctx.translate(xT, xY);
      ctx.rotate(Math.PI / items.length + (Math.PI / 180) * startAngle);
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    } else {
      ctx.fillText(text, X_CENTER, Y_CENTER);
    }
    ctx.restore();
    if (items.length !== 1) {
      ctx.stroke();
    }
    startAngle += segmentWidth;
    endAngle += segmentWidth;
  }
}

let guessItemIndex = Math.floor(Math.random() * items.length);
let segmentAngle = 360 / items.length;
let maxAngle = 360 * ROTATIONS + segmentAngle * guessItemIndex;
let animationId: number | null;
let winner: string;
let endTime: number;

function easeOut(
  time: number,
  beginningVal: number,
  toChange: number,
  duration: number
) {
  return time == duration
    ? beginningVal + toChange
    : toChange * (-Math.pow(2, (-10 * time) / duration) + 1) + beginningVal;
}

function startRoulette() {
  if (!animationId) {
    if (winner) {
      winner = "";
      winnerEl.textContent = "";
      drawRouletteWheel(0);
    } else {
      guessItemIndex = Math.floor(Math.random() * items.length);
      winner = itemsList.items[guessItemIndex].name;
      segmentAngle = 360 / items.length;
      totalTime = 0;
      maxAngle =
        360 * ROTATIONS +
        (items.length - 1 - guessItemIndex) * segmentAngle +
        Math.random() * segmentAngle;
      endTime = (maxAngle / rotate_by) * (1000 / ANIMATION_FPS);
      beginAnimateRoulette();
    }
  }
}


let totalTime = 0;
function beginAnimateRoulette() {
  const angle = easeOut(totalTime, 0, maxAngle, endTime);
  if (totalTime < endTime || maxAngle - angle > 0.1) {
    setTimeout(() => {
      drawRouletteWheel(angle);
      totalTime += 1000 / ANIMATION_FPS;
      animationId = window.requestAnimationFrame(beginAnimateRoulette);
    }, 1000 / ANIMATION_FPS);
  } else {
    window.cancelAnimationFrame(animationId!);
    animationId = null;
    winnerEl.textContent = `Winner: ${winner}`;
    animateWinner();
  }
}
