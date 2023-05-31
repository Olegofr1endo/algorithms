import { ILinkedList, IListNode } from "../../types/data";
import { ElementStates } from "../../types/element-states";

class LinkedListNode<T> implements IListNode<T>{
    value: T
    next: IListNode<T>|null
    constructor(value:T,next?:LinkedListNode<T>|null){
        this.value = value;
        this.next = next ? next : null;
    }
}


class LinkedList<T> implements ILinkedList<T>{
    private head: IListNode<T>|null
    private size:number
    maxSize: number
    constructor(maxSize:number = Infinity, baseList?:T[]){
        this.maxSize = maxSize
        this.head = null;
        this.size = 0
        if(baseList){
            for(let i = 0; i < baseList.length; i ++){
                this.append(baseList[i])
            }
        }
    }
    prepend(value: T){
        if(this.size >= this.maxSize){
            return
        }
        const node = new LinkedListNode(value, this.head)
        this.head = node
        this.size++
    }

    append(value: T){
        if(this.size >= this.maxSize){
            return
        }

        if(!this.head){
            this.head = new LinkedListNode(value)
            this.size++
            return
        }

        let curr = this.head;
        while(curr.next){
            curr = curr.next
        }

        curr.next = new LinkedListNode(value)
        this.size++
    }

    addByIndex(value:T, index:number){
        if(this.size >= this.maxSize){
            return
        }
        if(index > this.size){
            return
        }
        if(index === 0){
            this.prepend(value)
            return
        }
        let curr = this.head;
        for(let i = 1; i < index; i++){
            curr = curr!.next
        }
        curr!.next = new LinkedListNode(value, curr!.next);
        this.size++
    }

    deleteByIndex(index:number){
        if(index >= this.size){
            return
        }
        if(index === 0){
            this.deleteHead()
            return
        }
        let curr = this.head
        for(let i = 1; i < index; i++){
            curr= curr!.next
        }
        curr!.next = curr!.next!.next
        this.size--
    }

    deleteHead(){
        if(!this.head){
            return
        }
        this.head = this.head.next;
        this.size--
    }

    deleteTail(){
        if(!this.head){
            return
        }
        let curr:IListNode<T>|null = this.head;
        for(let i = 0; i < this.size - 2; i++){
            curr = curr!.next
        }
        curr!.next = null;
        if(this.size === 1){
            this.head = null
        }
        this.size--
    }

    toArray(){
        const result = [];
        let curr = this.head
        while(curr){
            result.push({value: curr.value, state: ElementStates.Default, head:"", tail: ""})
            curr = curr.next
        }
        return result
    }

}

export default LinkedList