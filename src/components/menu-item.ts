import { Component } from "./base-component";
import { ItemRemoval } from "./item-removal";

export class MenuItem extends Component<HTMLLIElement> {
  deleteItem: ItemRemoval;

  constructor(id: number, name: string, color: string) {
    const deleteItem = new ItemRemoval(id);
    const el = document.createElement("li");
    el.className = "menu-item";
    el.id = `${id}-item`;
    el.textContent = name;
    el.style.backgroundColor = color;
    el.appendChild(deleteItem.el);
    super(el);
    this.deleteItem = deleteItem;
    this.appearAnimation();
  }

  appearAnimation() {
    this.el.animate(
      [{ transform: "scale(1.25)" }, { transform: "scale(1.00)" }],
      {
        duration: 500,
      }
    );
  }
}
