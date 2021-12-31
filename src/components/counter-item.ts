import { Counter } from "../model/counter";
import { Component } from "./base-component";

export class CounterItem extends Component<HTMLElement>{
    private counter: Counter;

    constructor(min: number, max: number){
        const counterEl = document.createElement('p');
        counterEl.textContent = `${min}/${max}`;
        counterEl.className = 'counter-item';
        super(counterEl);
        this.counter = new Counter(min, max);
    }

    get getCounter(){
        return this.counter;
    }

    updateContent(){
        this.el.textContent = `${Counter.value}/${this.counter.max}`
        this.animate();
    }

    private animate(): void{
        this.el.animate(
            [
                { transform: 'scale(1.25)'},
                { transform: 'scale(1.00)'}
            ],
            {
                duration: 500
            }
        );
    }
}