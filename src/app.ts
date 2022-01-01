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
const lightDarkModeEl = document.getElementsByClassName('light-dark-mode')[0]! as HTMLDivElement;
const canvasEl = document.querySelector('canvas')! as HTMLCanvasElement;
const ctx = canvasEl.getContext('2d')!;
const bodyEl = document.querySelector('body')! as HTMLBodyElement;
const modeEl = lightDarkModeEl.querySelector('img')! as HTMLImageElement;
const canvasWrapper = document.getElementsByClassName('roulette-wheel')[0]! as HTMLDivElement;

const MAXIMUM_SIZE = 16;

counterEl.textContent = `0/${MAXIMUM_SIZE}`;

const itemsList = new ItemList(MAXIMUM_SIZE);
const items: MenuItem[] = [];

configure();

function configure() {
  LightDarkMode.currentMode = 'dark';
  IdPool.initializeIdsPool(MAXIMUM_SIZE);
  addRemoveItem();
  addItemByEnter();
  removeAllItems();
  lightDarkMode();
  drawRouletteWheel();
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
        drawRouletteWheel();
      });

      registerChangeColorByClick(item, menuItem);

      itemsList.add(item);
      items.push(menuItem);
      itemListEl.appendChild(menuItem.el);
      updateCounter();
      drawRouletteWheel();
    }
  });
}

function addItemByEnter(){
  bodyEl.addEventListener('keyup', (event: KeyboardEvent) => {
    if(event.key !== 'Enter'){
      return;
    }
    addButtonEl.click();
  })
}

function registerChangeColorByClick(item: Item, menuItem: MenuItem) {
  menuItem.el.addEventListener('click', () => {
      const actualColorIndex = avaliableRGBs.indexOf(menuItem.el.style.backgroundColor);
      if(actualColorIndex !== -1){
          const color = avaliableRGBs[(actualColorIndex + 1) % avaliableRGBs.length];
          menuItem.el.style.backgroundColor = color;
          item.color = color;
          drawRouletteWheel();
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
      drawRouletteWheel();
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

function lightDarkMode(){
  lightDarkModeEl.addEventListener('click', () => {
    modeEl.animate(
      [
        { transform: 'rotate(360deg)' }
      ],
      {
        duration: 500
      }
    );

    if(LightDarkMode.currentMode == 'dark'){
      modeEl.src = 'static/sun.png';
      bodyEl.style.backgroundColor = 'snow';
      bodyEl.style.color = 'black';
    }else{
      modeEl.src = 'static/moon.png';
      bodyEl.style.backgroundColor = '#121212';
      bodyEl.style.color = 'white';
    }

    LightDarkMode.changeMode();
  })
}

function drawRouletteWheel(){
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  canvasEl.width = canvasWrapper.offsetWidth;
  canvasEl.height = canvasWrapper.offsetHeight;
  const x = canvasEl.width / 2;
  const y = canvasEl.height / 2;
  const radius = canvasEl.height / 2;
  let startAngle = 0;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.stroke();
  const segmentWidth = 360 / items.length;
  let endAngle = segmentWidth;
  console.log(items.length);
  for(let i = 0; i < items.length; i++){
    ctx.beginPath();
    if(i === 1){
      ctx.lineTo(x, y);
    }
    ctx.arc(x, y, radius, (startAngle * Math.PI / 180), (endAngle * Math.PI / 180), false);
    ctx.lineTo(x, y);
    ctx.fillStyle = itemsList.items[i].color;
    ctx.fill();
    ctx.stroke();
    startAngle += segmentWidth;
    endAngle += segmentWidth;
  }
}

// // import { MenuItem } from "./components/menu-item";
// import { CounterItem } from "./components/counter-item";
// import { MenuItem } from "./components/menu-item";
// import { MenuItemList } from "./components/menu-item-list";
// import { OpenCloseArrow } from "./components/open-close-arrow";
// import { Counter } from "./model/counter";
// import { Item } from "./model/item";
// import { avaliableIds, initializeIdsPool } from "./utils/item-id-pool";
// import { avaliableRGBs } from "./utils/utils";
// // import { OpenCloseArrow } from "./components/open-close-arrow";

// const counterEl = document.getElementsByClassName(
//   "counter"
// )[0]! as HTMLDivElement;
// const itemMenuEl = document.getElementsByClassName(
//   "item-menu"
// )[0]! as HTMLDivElement;
// const openCloseMenuEl = document.getElementsByClassName(
//   "open-close-menu"
// )[0]! as HTMLDivElement;
// const inputEl = document.querySelector("input")! as HTMLInputElement;
// const addButtonEl = document.getElementsByClassName(
//   "new-item-button"
// )[0]! as HTMLButtonElement;
// const removeAllItemsButtonEl = document.getElementsByClassName(
//   "remove-all-items-button"
// )[0]! as HTMLButtonElement;

// const MIN_ITEMS = 0;
// const MAX_ITEMS = 16;

// const openCloseItem = new OpenCloseArrow();
// openCloseMenuEl.appendChild(openCloseItem.el);

// const counterItem = new CounterItem(MIN_ITEMS, MAX_ITEMS);
// counterEl.appendChild(counterItem.el);canvasEl

// const counter = counterItem.getCounter;

// const items: MenuItemList = new MenuItemList();
// itemMenuEl.appendChild(items.el);

// configure();

// function configure() {
//   initializeIdsPool(MAX_ITEMS);
// }

// addButtonEl.addEventListener("click", () => {
//   const id = avaliableIds.pop();
//   const name = inputEl.value;
//   if (id) {
//     if (name) {
//       if (counter.increment()) {
//         const item = new MenuItem(id, name, avaliableRGBs[MAX_ITEMS % Counter.value]);
//         console.log(item.deleteItem);
//         item.deleteItem.el.addEventListener('click', () => {
//           if(counter.decrement()){
//             avaliableIds.push(item.el.id)
//             items.removeItem(item);
//             counterItem.updateContent();
//           }
//         })
//         items.addItem(item);
//         counterItem.updateContent();
//       }
//     } else {
//       alert("Item name cannot be empty!");
//     }
//   } else {
//     alert("Maxium number of elements!");
//   }
// });

// removeAllItemsButtonEl.addEventListener("click", () => {
//   initializeIdsPool(MAX_ITEMS);
//   items.clear();
//   counter.clear();
//   counterItem.updateContent();
// });

// // const openCloseMenuEl = document.getElementsByClassName(
// //   "open-close-menu"
// // )[0]! as HTMLDivElement;

// // const itemNameInput = document.querySelector("input")! as HTMLInputElement;

// // const newItemButtonEl = document.getElementById(
// //   "newItemButton"
// // )! as HTMLButtonElement;

// // const removeAllItemsButtonEl = document.getElementById(
// //   "removeAllItemsButton"
// // )! as HTMLButtonElement;

// // // const newItemMenu = document.getElementById('new-item-menu')! as HTMLDivElement;

// // menuEl.appendChild(items.el);
// // openCloseMenuEl.appendChild(new OpenCloseArrow().el);

// // const avaliableRGBs = ["255, 0, 0", "0, 255, 0", "0, 0, 255"];
// // const bgOpacity = 0.5;
// // let nextColor = avaliableRGBs[0];

// // const idsPool: number[] = [];
// // initalizeIdsPool();

// // function addNewItem() {
// //   if (itemNameInput.value.length > 0 && itemNameInput.value.length <= 32) {
// //     if (counter < maxItems && idsPool.length > 0) {
// //       const item = new MenuItem(
// //         idsPool.pop()!,
// //         itemNameInput.value,
// //         `rgba(${nextColor}, ${bgOpacity})`
// //       );

// //       item.deleteItem.el.addEventListener("click", () => {
// //         const itemElId = calculateItemElId(item);
// //         idsPool.push(itemElId);
// //         setNextColor();
// //         items.removeItem(item);
// //         counter--;
// //         updateCounter();
// //       });

// //       items.addItem(item);
// //       counter++;
// //       updateCounter();
// //       setNextColor();
// //     } else {
// //       alert("Maximum number of items!");
// //     }
// //   }
// // }

// // function removeAllItems() {
// //   if (items.itemsLength > 0) {
// //     items.clear();
// //     counter = 0;
// //     initalizeIdsPool();
// //     nextColor = avaliableRGBs[0];
// //     updateCounter();
// //   } else {
// //     alert("Nothing to clear!");
// //   }
// // }

// // function updateCounter() {
// //   counterEl.textContent = `${counter}/${maxItems}`;
// //   counterEl.animate([
// //     { transform: 'scale(1.25)'},
// //     { transform: 'scale(1.00)'}
// //   ],
// //   {
// //     duration: 500
// //   }
// //   );
// // }

// // function setNextColor() {
// //   nextColor = avaliableRGBs[counter % avaliableRGBs.length];
// // }

// // function calculateItemElId(item: MenuItem) {
// //   return +item.el.id.slice(0, item.el.id.indexOf("-"));
// // }

// // const openCloseArrow = document.getElementById("open-close-arrow")!;
// // let open = true;

// // function rotateOpenCloseArrow() {
// //   openCloseArrow.animate([
// //     { transform: 'rotate(180deg)' }
// //   ],
// //   {
// //     duration: 500,

// //   }
// //   );
// //   if(open){
// //     menuEl.className = 'decreasing';
// //     open = false;
// //   }else{
// //     menuEl.className = 'normal';
// //     open = true;
// //   }

// // }

// // function initalizeIdsPool() {
// //   idsPool.length = 0;
// //   for (let i = 0; i < maxItems; i++) {
// //     idsPool.push(i);
// //   }
// // }

// // newItemButtonEl.addEventListener("click", addNewItem);
// // removeAllItemsButtonEl.addEventListener("click", removeAllItems);
// // openCloseArrow.addEventListener("click", rotateOpenCloseArrow);
