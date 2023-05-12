import { IStack, TStackNode } from "../../types/data";

class Stack<T = TStackNode<string>> implements IStack<T>{
    store: T[];
    maxLength: number;
    size: number;
    constructor(maxLength:number){
        this.store = [];
        this.maxLength = maxLength;
        this.size = 0;
    }

    pop(){
        if(this.store.length <= 0){
            return
        }
        this.store.pop();
        this.size--
    }

    push(item: T){
        if(this.store.length >= this.maxLength){
            return
        }
        this.store.push(item)
        this.size++
    }

    clear(){
        this.store = []
        this.size = 0;
    }

    get(){
        if(this.store.length <= 0){
            return null
        }
        return this.store[this.store.length - 1]
    }
}

export default Stack