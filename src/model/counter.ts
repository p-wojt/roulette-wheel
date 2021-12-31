export class Counter {
    static value: number;
    min: number;
    max: number;

    constructor(min: number, max: number){
        Counter.value = min;
        this.min = min;
        this.max = max;
    }

    increment(){
        if(!this.isMax()){
            Counter.value++;
            return true;
        }
        return false;
    }

    decrement(){
        if(!this.isMin()){
            Counter.value--;
            return true;
        }
        return false;
    }

    clear(){
        Counter.value = 0;
    }

    private isMax(){
        return this.max === Counter.value;
    }

    private isMin(){
        return this.min === Counter.value;
    }
}