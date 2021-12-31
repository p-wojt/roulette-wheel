import { Component } from "./base-component";
import { ItemRemoval } from "./item-removal";

export class MenuItem extends Component<HTMLLIElement> {

    deleteItem: ItemRemoval;

    constructor(id: number, value: string, color: string){
        const deleteItem = new ItemRemoval(id);
        const el = document.createElement('li');
        el.className = 'menu-item';
        el.id = `${id}-item`;
        el.textContent = value;
        el.style.backgroundColor = color;
        el.appendChild(deleteItem.el);
        super(el);
        this.deleteItem = deleteItem;
    }
}