import { Item } from "./item";
import { List } from "./list";

export class ItemList implements List<Item> {
  items: Item[];
  maximumSize: number;

  constructor(maxSize: number) {
    this.items = [];
    this.maximumSize = maxSize;
  }

  add(item: Item) {
    if (this.items.length < this.maximumSize) this.items.push(item);
  }

  removeById(id: number) {
    const toRemove = this.items.find((e) => e.id === id);
    if (toRemove) {
      this.remove(toRemove);
    }
  }

  remove(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }

  clear() {
    this.items = [];
  }
}
