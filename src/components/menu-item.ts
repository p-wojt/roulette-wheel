import { Component } from "./base-component";
import { DeleteItemEl } from "./menu-delete-item";

export class ItemEl extends Component<HTMLLIElement> {

    deleteItem: DeleteItemEl;

    constructor(id: number, value: string, color: string){
        const deleteItem = new DeleteItemEl(id);
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