// import { MenuItem } from "./components/menu-item";
import { CounterItem } from "./components/counter-item";
import { MenuItem } from "./components/menu-item";
import { MenuItemList } from "./components/menu-item-list";
import { OpenCloseArrow } from "./components/open-close-arrow";
import { Counter } from "./model/counter";
import { Item } from "./model/item";
import { avaliableIds, initializeIdsPool } from "./utils/item-id-pool";
import { avaliableRGBs } from "./utils/utils";
// import { OpenCloseArrow } from "./components/open-close-arrow";

const counterEl = document.getElementsByClassName(
  "counter"
)[0]! as HTMLDivElement;
const itemMenuEl = document.getElementsByClassName(
  "item-menu"
)[0]! as HTMLDivElement;
const openCloseMenuEl = document.getElementsByClassName(
  "open-close-menu"
)[0]! as HTMLDivElement;
const inputEl = document.querySelector("input")! as HTMLInputElement;
const addButtonEl = document.getElementsByClassName(
  "new-item-button"
)[0]! as HTMLButtonElement;
const removeAllItemsButtonEl = document.getElementsByClassName(
  "remove-all-items-button"
)[0]! as HTMLButtonElement;
HTMLUL

const MIN_ITEMS = 0;
const MAX_ITEMS = 16;

const openCloseItem = new OpenCloseArrow();
openCloseMenuEl.appendChild(openCloseItem.el);

const counterItem = new CounterItem(MIN_ITEMS, MAX_ITEMS);
counterEl.appendChild(counterItem.el);

const counter = counterItem.getCounter;

const items: MenuItemList = new MenuItemList();
itemMenuEl.appendChild(items.el);



configure();

function configure() {
  initializeIdsPool(MAX_ITEMS);
}

addButtonEl.addEventListener("click", () => {
  const id = avaliableIds.pop();
  const name = inputEl.value;
  if (id) {
    if (name) {
      if (counter.increment()) {
        const item = new MenuItem(id, name, avaliableRGBs[MAX_ITEMS % Counter.value]);
        console.log(item.deleteItem);
        item.deleteItem.el.addEventListener('click', () => {
          if(counter.decrement()){
            avaliableIds.push(item.el.id)
            items.removeItem(item);
            counterItem.updateContent();
          }          
        })
        items.addItem(item);
        counterItem.updateContent();
      }
    } else {
      alert("Item name cannot be empty!");
    }
  } else {
    alert("Maxium number of elements!");
  }
});

removeAllItemsButtonEl.addEventListener("click", () => {
  initializeIdsPool(MAX_ITEMS);
  items.clear();
  counter.clear();
  counterItem.updateContent();
});

// const openCloseMenuEl = document.getElementsByClassName(
//   "open-close-menu"
// )[0]! as HTMLDivElement;

// const itemNameInput = document.querySelector("input")! as HTMLInputElement;

// const newItemButtonEl = document.getElementById(
//   "newItemButton"
// )! as HTMLButtonElement;

// const removeAllItemsButtonEl = document.getElementById(
//   "removeAllItemsButton"
// )! as HTMLButtonElement;

// // const newItemMenu = document.getElementById('new-item-menu')! as HTMLDivElement;

// menuEl.appendChild(items.el);
// openCloseMenuEl.appendChild(new OpenCloseArrow().el);

// const avaliableRGBs = ["255, 0, 0", "0, 255, 0", "0, 0, 255"];
// const bgOpacity = 0.5;
// let nextColor = avaliableRGBs[0];

// const idsPool: number[] = [];
// initalizeIdsPool();

// function addNewItem() {
//   if (itemNameInput.value.length > 0 && itemNameInput.value.length <= 32) {
//     if (counter < maxItems && idsPool.length > 0) {
//       const item = new MenuItem(
//         idsPool.pop()!,
//         itemNameInput.value,
//         `rgba(${nextColor}, ${bgOpacity})`
//       );

//       item.deleteItem.el.addEventListener("click", () => {
//         const itemElId = calculateItemElId(item);
//         idsPool.push(itemElId);
//         setNextColor();
//         items.removeItem(item);
//         counter--;
//         updateCounter();
//       });

//       items.addItem(item);
//       counter++;
//       updateCounter();
//       setNextColor();
//     } else {
//       alert("Maximum number of items!");
//     }
//   }
// }

// function removeAllItems() {
//   if (items.itemsLength > 0) {
//     items.clear();
//     counter = 0;
//     initalizeIdsPool();
//     nextColor = avaliableRGBs[0];
//     updateCounter();
//   } else {
//     alert("Nothing to clear!");
//   }
// }

// function updateCounter() {
//   counterEl.textContent = `${counter}/${maxItems}`;
//   counterEl.animate([
//     { transform: 'scale(1.25)'},
//     { transform: 'scale(1.00)'}
//   ],
//   {
//     duration: 500
//   }
//   );
// }

// function setNextColor() {
//   nextColor = avaliableRGBs[counter % avaliableRGBs.length];
// }

// function calculateItemElId(item: MenuItem) {
//   return +item.el.id.slice(0, item.el.id.indexOf("-"));
// }

// const openCloseArrow = document.getElementById("open-close-arrow")!;
// let open = true;

// function rotateOpenCloseArrow() {
//   openCloseArrow.animate([
//     { transform: 'rotate(180deg)' }
//   ],
//   {
//     duration: 500,

//   }
//   );
//   if(open){
//     menuEl.className = 'decreasing';
//     open = false;
//   }else{
//     menuEl.className = 'normal';
//     open = true;
//   }

// }

// function initalizeIdsPool() {
//   idsPool.length = 0;
//   for (let i = 0; i < maxItems; i++) {
//     idsPool.push(i);
//   }
// }

// newItemButtonEl.addEventListener("click", addNewItem);
// removeAllItemsButtonEl.addEventListener("click", removeAllItems);
// openCloseArrow.addEventListener("click", rotateOpenCloseArrow);
