import { ReactElement } from "react"
import { ElementStates } from "./element-states"
import { ListActive } from "./list-active"

export type TValueAndStatus<T> = {value: T, status: ElementStates}

export type TStackNode<T> = {value: T, status: ElementStates}

export type TListState<T> = {value: string, byIndexValue: string, result: TLinkedListArr<T>, active: null|ListActive}

export type TLinkedListArr<T> = {value:T, head: ReactElement | string, tail: ReactElement | string , state:ElementStates}[]

export interface IStack<T>{
    store: T[],
    maxLength: number,
    size: number,
    push: (item:T)=>void,
    pop: ()=>void,
    get: ()=>(T|null),
    clear: ()=>void
}

export interface IQueue<T>{
    store: (T|undefined)[],
    length: number,
    startIndex: number,
    endIndex: number,
    size: number,
    enqueue: (item:T)=>void,
    dequeue: ()=>void,
    get: ()=>(T|null),
    clear: ()=>void
}

export interface IListNode<T=string>{
    value: T,
    next: IListNode<T>|null,
}

export interface ILinkedList<T=string>{
    maxSize: number,
    append: (value: T)=>void
    prepend: (value: T)=>void
    addByIndex: (value: T, index:number) => void,
    deleteByIndex: (index: number) => void,
    deleteHead: () => void,
    deleteTail: () => void,
    toArray: () => TLinkedListArr<T>
}