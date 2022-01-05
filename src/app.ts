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
const winnerEl = document.getElementsByClassName('winner')[0]! as HTMLDivElement;

const MAXIMUM_SIZE = 16;
canvasEl.width = canvasWrapper.offsetWidth;
canvasEl.height = canvasWrapper.offsetHeight;
const x = canvasEl.width / 2;
const y = canvasEl.height / 2;
const radius = canvasEl.height / 2 - 5;
const animationFPSRate = 30;

counterEl.textContent = `0/${MAXIMUM_SIZE}`;

const itemsList = new ItemList(MAXIMUM_SIZE);
const items: MenuItem[] = [];

configure();

function configure() {
  LightDarkMode.currentMode = "dark";
  IdPool.initializeIdsPool(MAXIMUM_SIZE);
  addRemoveItem();
  addItemByEnter();
  removeAllItems();
  lightDarkMode();
  drawRouletteWheel(0);
}

function addRemoveItem() {
  addButtonEl.addEventListener("click", () => {
    const name = inputEl.value;
    const id = IdPool.getAnId();
    if (name && id) {
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
      maxAngle = 360 * rotations + segmentAngle * guessItemIndex;
      segmentAngle = 360 / items.length;
      drawRouletteWheel(0);
    }
  });
}

function addItemByEnter() {
  bodyEl.addEventListener("keyup", (event: KeyboardEvent) => {
    if (event.key !== "Enter") {
      return;
    }
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
      drawRouletteWheel(0);
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
    [{ transform: "scale(1.25)" }, { transform: "scale(1.00)" }],
    {
      duration: 500,
    }
  );
}

function lightDarkMode() {
  lightDarkModeEl.addEventListener("click", () => {
    modeEl.animate([{ transform: "rotate(360deg)" }], {
      duration: 500,
    });

    if (LightDarkMode.currentMode == "dark") {
      modeEl.src = "static/sun.png";
      bodyEl.style.backgroundColor = "snow";
      bodyEl.style.color = "black";
    } else {
      modeEl.src = "static/moon.png";
      bodyEl.style.backgroundColor = "#121212";
      bodyEl.style.color = "white";
    }

    LightDarkMode.changeMode();
  });
}

const arrowImage = document.createElement("img");
arrowImage.src = "static/arrow-down.png";
arrowImage.alt = "arrow";

function drawRouletteWheel(angle: number) {
  const segmentWidth = 360 / items.length;
  let startAngle = angle;
  let endAngle = segmentWidth + startAngle;
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  ctx.beginPath();
  // let xtemp = x + Math.cos(totalAngle/2) * radius/2;
  // let ytemp = y + Math.sin(totalAngle/2) * radius/2;
  ctx.save();
  ctx.translate(x + radius + 50, y);
  ctx.lineTo(0, -20);
  ctx.lineTo(0, 20);
  ctx.lineTo(-50, 0);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.stroke();
  for (let i = 0; i < items.length; i++) {
    ctx.beginPath();
    ctx.lineTo(x, y);
    ctx.font = "bold 24px verdana, sans-serif";
    ctx.arc(
      x,
      y,
      radius,
      (startAngle * Math.PI) / 180,
      (endAngle * Math.PI) / 180,
      false
    );
    ctx.lineTo(x, y);
    ctx.fillStyle = itemsList.items[i].color;
    ctx.fill();
    ctx.save();
    ctx.fillStyle = "black";
    const text = itemsList.items[i].name;
    if (items.length > 1) {
      const xT =
        x +
        (Math.cos((startAngle + segmentWidth / 2) * Math.PI / 180) * radius) /
          2;
      const xY =
        y +
        (Math.sin((startAngle + segmentWidth / 2) * Math.PI / 180) * radius) /
          2;
      ctx.translate(xT, xY);
      console.log(totalAngle);
      ctx.rotate(Math.PI / items.length + Math.PI/180 * startAngle);
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);

    }else{
      ctx.fillText(text, x, y);
    }
    ctx.restore();
    if (items.length !== 1) {
      ctx.stroke();
    }
    startAngle += segmentWidth;
    endAngle += segmentWidth;
    // xtemp += Math.cos(totalAngle/2) * radius/2;
    // ytemp += Math.sin(totalAngle/2) * radius/2;
    // console.log(ytemp);
  }
}

let guessItemIndex = Math.floor(Math.random() * items.length);
let segmentAngle = 360 / items.length;
const rotations = 1;
let maxAngle = 360 * rotations + segmentAngle * guessItemIndex;
let angleSpeed = 0;
let totalAngle = 0;
let animationId: number | null;
let startAngle = 2;
// const maxAngleSpeed = segmentAngle;

function startRoulette() {
  if (animationId) {
    //resetRouletteAnimation();
  } else {
    guessItemIndex = Math.floor(Math.random() * items.length);
    console.log(guessItemIndex);
    segmentAngle = 360 / items.length;
    maxAngle =
      360 * rotations +
      (items.length - 1 - guessItemIndex) * segmentAngle +
      Math.random() * segmentAngle;
    beginAnimateRoulette();
  }
}

function beginAnimateRoulette() {
  if (totalAngle < maxAngle) {
    drawRouletteWheel(angleSpeed);
    angleSpeed += startAngle;
    totalAngle += startAngle;
    setTimeout(() => {
      animationId = window.requestAnimationFrame(beginAnimateRoulette);
    }, 1000 / animationFPSRate);
  } else {
    window.cancelAnimationFrame(animationId!);
    animationId = null;
    angleSpeed = 1;
    totalAngle = 0;
    winnerEl.textContent = `Winner: ${itemsList.items[guessItemIndex].name}`;
  }
}

// function resetRouletteAnimation(){
//   if(animationId){
//     window.cancelAnimationFrame(animationId!)
//   }
//   drawRouletteWheel(0);
//   animationId = null;
//   angleSpeed = 1;
//   totalAngle = 0;
//   delta = 0.2;
// }

canvasEl.addEventListener("click", startRoulette);
