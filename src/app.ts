import { ItemEl } from "./components/menu-item";
import { ItemElList } from "./components/menu-item-list";

const canvas = document.querySelector("canvas")! as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const centreX = canvas.width / 2;
const centreY = canvas.height / 2;

ctx.beginPath();
ctx.moveTo(centreX, centreY);
ctx.stroke();

console.log("Works!");

const maxItems = 16;
const items: ItemElList = new ItemElList();

const menuEl = document.getElementById("menu")! as HTMLDivElement;
const counterEl = document.getElementById("counter")!;
const itemNameInput = document.querySelector("input")! as HTMLInputElement;
const newItemButtonEl = document.getElementById(
  "newItemButton"
)! as HTMLButtonElement;
const removeAllItemsButtonEl = document.getElementById(
  "removeAllItemsButton"
)! as HTMLButtonElement;

menuEl.appendChild(items.el);

const avaliableRGBs = ["255, 0, 0", "0, 255, 0", "0, 0, 255"];
const bgOpacity = 0.5;
let nextColor = avaliableRGBs[0];

let counter = 0;

const idsPool: number[] = [];
initalizeIdsPool();

function addNewItem() {
  if (itemNameInput.value.length > 0 && itemNameInput.value.length <= 32) {
    if (counter < maxItems && idsPool.length > 0) {
      const item = new ItemEl(
        idsPool.pop()!,
        itemNameInput.value,
        `rgba(${nextColor}, ${bgOpacity})`
      );

      item.deleteItem.el.addEventListener("click", () => {
        const itemElId = calculateItemElId(item);
        idsPool.push(itemElId);
        setNextColor();
        items.removeItem(item);
        counter--;
        updateCounter();
      });

      items.addItem(item);
      counter++;
      updateCounter();
      setNextColor();
    } else {
      alert("Maximum number of items!");
    }
  }
}

function removeAllItems() {
  if (items.itemsLength > 0) {
    items.clear();
    counter = 0;
    initalizeIdsPool();
    nextColor = avaliableRGBs[0];
    updateCounter();
  } else {
    alert("Nothing to clear!");
  }
}

function updateCounter() {
  counterEl.textContent = `${counter}/${maxItems}`;
}

function setNextColor() {
  nextColor = avaliableRGBs[counter % avaliableRGBs.length];
}

function calculateItemElId(item: ItemEl) {
  return +item.el.id.slice(0, item.el.id.indexOf("-"));
}

function initalizeIdsPool() {
  idsPool.length = 0;
  for (let i = 0; i < maxItems; i++) {
    idsPool.push(i);
  }
}

newItemButtonEl.addEventListener("click", addNewItem);
removeAllItemsButtonEl.addEventListener("click", removeAllItems);
