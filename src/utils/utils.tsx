import { Circle } from "../components/ui/circle/circle";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../constants/delays";
import { ILinkedList, TLinkedListArr, TListState, TValueAndStatus } from "../types/data";
import { Direction } from "../types/direction";
import { ElementStates } from "../types/element-states";


// Генератор массива случайных чисел от 0 до maxNum включительно. Длинна массива от min до max
export const randomArr: (min:number, max: number, maxNum:number) => string[] = (min, max, maxNum) => {
    let arr = new Array(Math.floor(Math.random()*(max - min + 1)) + min);

    for(let i = 0; i < arr.length; i++){
        arr[i] = Math.floor(Math.random()*(maxNum + 1)).toString()
    }

    return arr
}

let delay = async (delay: number)=>{
    return new Promise((res, rej)=>{
        setTimeout(res, delay)
    })
}


const swap: (arr: Array<any>, index1: number, index2: number) => void = (arr, index1, index2) =>{
    let buf = arr[index1];
    arr[index1] = arr[index2]
    arr[index2] = buf
}

export const reverseString = async (strArr: TValueAndStatus<string>[], isDelay:boolean, callback?: (arr:TValueAndStatus<string>[])=>void) => {
    if(strArr.length === 0){
        return strArr
    }
    strArr = [...strArr]
    let a = 0;
    let b = strArr.length - 1;
    isDelay && await delay(DELAY_IN_MS)
    while(a < b){
        strArr[b].status = ElementStates.Changing;
        strArr[a].status = ElementStates.Changing;
        callback && callback(strArr)
        await delay(DELAY_IN_MS)
        swap(strArr, a, b)
        strArr[b].status = ElementStates.Modified;
        strArr[a].status = ElementStates.Modified;
        a++;
        b--
    }
    if(a === b){
        strArr[a].status = ElementStates.Modified
    }
    return strArr
}

export const getFibonacciNumbers: (index:number)=>number[] = (index) => {
    const res = [1,1];
    let i = 0;
    while(i < index - 1){
        i++
        res.push(res[res.length - 1] + res[res.length - 2])
    }
    return res
}


// Функции анимации сортировки. в if-блоках направление сортировки

export const selectionSort = async (arr:TValueAndStatus<number>[], direction:Direction, isDelay: boolean, callback?: (arr:TValueAndStatus<number>[])=>void) => {
    if(arr.length === 0){
        return arr
    }
    let a = 0;
    let b = 0;
    let current = 0;
    while (b < arr.length - 1){
        if(a>=arr.length - 1){
            if(direction === Direction.Ascending ? arr[current].value >= arr[a].value : arr[current].value <= arr[a].value){
                arr[current].status = ElementStates.Default
                current = a
            }
            if(direction === Direction.Ascending ? arr[current].value < arr[b].value : arr[current].value > arr[b].value){
                swap(arr, current, b)
            }
            arr[a].status = ElementStates.Default
            arr[b].status = ElementStates.Modified
            b++;
            a = b;
            current = b
            arr[current].status = ElementStates.Changing;
            callback && callback(arr)
        } else if(direction === Direction.Ascending ? arr[current].value >= arr[a].value : arr[current].value <= arr[a].value) {
            arr[current].status = ElementStates.Default;
            current = a
            arr[current].status = ElementStates.Changing;
            a++
            arr[a].status = ElementStates.Changing;
            callback && callback(arr)
        } else {
            arr[a].status = ElementStates.Default;
            a++
            arr[a].status = ElementStates.Changing;
            callback && callback(arr)
        }
        isDelay && await delay(DELAY_IN_MS);
    }
    if(arr.length !== 1){
        arr[b-1].status = ElementStates.Modified
    }
    arr[b].status = ElementStates.Modified
    callback && callback(arr)
    return arr
}


export const bubbleSort:(arr:TValueAndStatus<number>[], finishIndex: number, currIndex: number, direction:Direction, isDelay: boolean, callback?: (arr:TValueAndStatus<number>[])=>void)=> Promise<TValueAndStatus<number>[]> = async (arr, finishIndex, currIndex, direction, isDelay, callback) =>{
    if(arr.length === 0){
        return arr
    }
    isDelay && await delay(DELAY_IN_MS);
    let next: number = currIndex+1
    if(finishIndex <= 1){ // Условие выхода из рекурсии
        arr[currIndex].status = ElementStates.Modified
        return arr
    }
    if(next >= finishIndex){ // Условие для перехода на новую итерацию поиска по массиву
        arr[currIndex].status = ElementStates.Modified
        arr[currIndex - 1].status = ElementStates.Default
        callback && callback(arr)
        return bubbleSort(arr, finishIndex - 1, 0, direction, isDelay, callback)
    }

    arr[currIndex].status = ElementStates.Changing;
    arr[next].status= ElementStates.Changing;

    if(currIndex - 1 >= 0){
        arr[currIndex - 1].status = ElementStates.Default
    }
    if(direction === Direction.Ascending ? arr[next].value < arr[currIndex].value : arr[next].value > arr[currIndex].value){
        swap(arr, next ,currIndex)
        callback && callback(arr)
        return bubbleSort(arr, finishIndex, currIndex + 1, direction, isDelay, callback)
    } else {
        callback && callback(arr)
        return bubbleSort(arr, finishIndex, currIndex + 1, direction, isDelay, callback)
    }
}

// Анимация добавления элемента
export const addListElement: (state:TListState<string>, setState: React.Dispatch<any>, list:ILinkedList, arr:TLinkedListArr<any>, value: string, index?:number)=>void = (state, setState, list, arr, value,  index = 0) =>{
    if(!arr.length){ // Вариант для пустого массива
        list.addByIndex(value, index)
        arr = list.toArray();
        arr[index] = {...arr[index], value:value, state: ElementStates.Modified}
        setState({...state, result: arr})
        setTimeout(()=>{
            arr[index] = {...arr[index], state: ElementStates.Default}
            setState({...state, active: null, result: arr})
        }, SHORT_DELAY_IN_MS)
        return
    }

    if(!arr[index]){ // Вариант для элемента добавляемого в конец
        arr[arr.length-1] = {...arr[arr.length-1], head:<Circle isSmall={true} letter={value} state={ElementStates.Changing} />}
        setState({...state, result: arr})
        setTimeout(()=>{
        list.append(value)
        arr = list.toArray();
        arr[arr.length-1] = {...arr[arr.length-1], state: ElementStates.Modified}
        setState({...state, result: arr})
        setTimeout(()=>{
            setState({...state, active: null, result: list.toArray()})
        }, SHORT_DELAY_IN_MS)
    }, SHORT_DELAY_IN_MS)
    return
    }

    arr[index] = {...arr[index], head:<Circle isSmall={true} letter={value} state={ElementStates.Changing} />} // Остальные варианты
    setState({...state, result: arr})
    setTimeout(()=>{
        list.addByIndex(value, index)
        arr = list.toArray();
        arr[index] = {...arr[index], state: ElementStates.Modified}
        setState({...state, result: arr})
        setTimeout(()=>{
            setState({...state,active: null, result: list.toArray()})
        }, SHORT_DELAY_IN_MS)
    }, SHORT_DELAY_IN_MS)
}

// Анимация удаления элемента

export const removeListElement: (state:TListState<string>, setState: React.Dispatch<any>, list:ILinkedList, arr:TLinkedListArr<any>, index?:number)=>void = (state, setState, list, arr, index = 0) =>{
    arr[index] = {...arr[index], state:ElementStates.Changing}
    setState({...state, result: arr})
    setTimeout(()=>{
        arr[index] = {...arr[index], value: "", tail: <Circle isSmall={true} letter={arr[index].value} state={ElementStates.Changing} />, state: ElementStates.Modified}
        setState({...state, result: arr})
        setTimeout(()=>{
            list.deleteByIndex(index);
            arr = list.toArray();
            setState({...state, active: null, result: arr})
        }, SHORT_DELAY_IN_MS)
    }, SHORT_DELAY_IN_MS)
}

// Анимация прохода по списку, в поиске нужного элемента для добавления.

export const animateAddition: (state:TListState<string>, setState: React.Dispatch<any>, list:ILinkedList, index:number, value:string, callBack?:Function)=>void = (state, setState, list, index, value, callBack) =>{

    let i = 0;
    let arr = list.toArray()
    const interval = setInterval(()=>{
        if(i >= index){
            arr[i-1] = {...arr[i-1], head: ""}
            addListElement(state, setState, list, arr, value, index)
            clearInterval(interval)
            return
        }
        arr[i].state = ElementStates.Changing
        arr[i].head = <Circle isSmall={true} letter={value} state={ElementStates.Changing} />
        if(arr[i-1]){
            arr[i-1].head = ""
        }
        setState({...state, result: arr})
        i++
    }, SHORT_DELAY_IN_MS)
}

// Анимация прохода по списку, в поиске нужного элемента для удаления.

export const animateDelition: (state:TListState<string>, setState: React.Dispatch<any>, list:ILinkedList, index:number, callBack?:Function)=>void = (state, setState, list, index, callBack) =>{

    let arr = list.toArray();
    let i = 0;
    const interval = setInterval(()=>{
        if(i === index){
            removeListElement(state, setState, list, arr, index)
            clearInterval(interval)
            return
        }
        arr[i].state = ElementStates.Changing;
        setState({...state, result: arr})
        i++
    }, SHORT_DELAY_IN_MS)
}
