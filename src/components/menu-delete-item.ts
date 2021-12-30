import { Component } from "./base-component";

export class DeleteItemEl extends Component<HTMLImageElement>{

    constructor(id: number){
        const el = document.createElement('img');
        el.src = 'static/close.png';
        el.alt = 'delete';
        el.className = 'item-delete'
        el.id = `${id}-delete`;
        super(el);
    }

    configure(){
        // TODO: make icon rotation after mouse over event
    }
}