import { Component } from "./base-component";
import { MenuItem } from "./menu-item";

export class MenuItemList extends Component<HTMLUListElement> {
  private items: MenuItem[];

  constructor() {
    const UList = document.createElement("ul");
    UList.className = "item-list";
    super(UList);
    this.items = [];
  }

  get itemsLength() {
    return this.items.length;
  }

  addItem(item: MenuItem) {
    this.items.push(item);
    this.el.appendChild(item.el);
  }

  clear() {
    this.removeChildren();
    this.items = [];
  }

  removeItem(item: MenuItem) {
    item.el.remove();
    const indexToRemove = this.items.indexOf(item);
    this.items.splice(indexToRemove, 1);
  }
}
