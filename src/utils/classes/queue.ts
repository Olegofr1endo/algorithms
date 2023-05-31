import { IQueue, TStackNode } from "../../types/data";

class Queue<T = TStackNode<string>> implements IQueue<T>{
    store: (T|undefined)[];
    length: number;
    startIndex: number;
    endIndex: number;
    size: number;
    constructor(length:number){
        this.store = Array.from({length: length})
        this.length = length;
        this.startIndex = 0;
        this.endIndex = 0;
        this.size = 0;
    }


    enqueue(item: T){
        if(!this.store.find(item => item)){
            this.startIndex = 0;
            this.endIndex = 0;
        }
        const index = (this.endIndex) % this.length
        
        if(this.store[index]){
            return
        }

        this.store[index] = item
        this.endIndex++
        this.size++
    }

    dequeue(){
        if(this.startIndex === this.endIndex){
            return
        }
        const index = this.startIndex % this.length
        this.store[index] = undefined;
        this.startIndex++;
        this.size--
    }

    clear(){
        this.store = this.store.map(() => undefined)
        this.size = 0;
    }

    get(){
        if(this.startIndex === this.endIndex){
            return null
        }
        const index = this.startIndex % this.length
        const el = this.store[index]
        return el ? el : null
    }
}

export default Queue