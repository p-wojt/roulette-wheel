import { Component } from "./base-component";
import { ItemEl } from "./menu-item";

export class ItemElList extends Component<HTMLUListElement> {
    private items: ItemEl[];

    constructor(){
        const UList = document.createElement('ul');
        UList.className = 'item-list';
        super(UList);
        this.items = [];
    }

    get itemsLength() {
        return this.items.length;
    }
    
    addItem(item: ItemEl){
        this.items.push(item);
        this.el.appendChild(item.el);
    }

    clear(){
        this.removeChildren();
        this.items = [];
    }

    removeItem(item: ItemEl){
        item.el.remove();
        const indexToRemove = this.items.indexOf(item);
        this.items.splice(indexToRemove, 1);
    }

    findLastItem(){
        if(this.items.length > 0){
            return this.items[this.items.length - 1];
        }
        return null;
    }
}
