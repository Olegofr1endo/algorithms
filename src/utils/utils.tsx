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


const swap: (arr: Array<any>, index1: number, index2: number) => void = (arr, index1, index2) =>{
    let buf = arr[index1];
    arr[index1] = arr[index2]
    arr[index2] = buf
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

export const selectionSort:(arr:TValueAndStatus<number>[], direction:Direction, setState:React.Dispatch<any>, state:object)=> void = (arr, direction, setState, state) =>{
    let a = 0; // Индекс текущего элемента при переборе 
    let b = 0; // Индекс позиции, на которую встанет найденый элемент 
    let current: number = 0 // Индекс найденного наименьшего/наимобльшего
    const interval = setInterval(()=>{

        if(a>=arr.length - 1){ // Условие для перехода на новую итерацию поиска по массиву
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
            setState({...state, result: arr})
        } else if(direction === Direction.Ascending ? arr[current].value >= arr[a].value : arr[current].value <= arr[a].value) { // Условие новом найденном наибольшем/наименьшем
            arr[current].status = ElementStates.Default;
            current = a
            arr[current].status = ElementStates.Changing;
            a++
            arr[a].status = ElementStates.Changing;
            setState({...state, result: arr})
        } else { // Условие перехода на следующий элемент в текущей итерации 
            arr[a].status = ElementStates.Default;
            a++
            arr[a].status = ElementStates.Changing;
            setState({...state, result: arr})
        }

        if(b >= arr.length - 1){ // Услвие выхода из цикла
            arr[b-1].status = ElementStates.Modified
            arr[b].status = ElementStates.Modified
            setState({...state, sortDirection: null, result: arr, onSort: false})
            clearInterval(interval)
            return
        }
    }, DELAY_IN_MS)
}

export const bubbleSort:(arr:TValueAndStatus<number>[], finishIndex: number, currIndex: number, direction:Direction, setState:React.Dispatch<any>, state:object)=> void = (arr, finishIndex, currIndex, direction, setState, state) =>{
    setTimeout(()=>{
    let next: number = currIndex+1
    if(finishIndex <= 1){ // Условие выхода из рекурсии
        arr[currIndex].status = ElementStates.Modified
        setState({...state, sortDirection: null , result: arr, onSort: false})
        return
    }
    if(next >= finishIndex){ // Условие для перехода на новую итерацию поиска по массиву
        arr[currIndex].status = ElementStates.Modified
        arr[currIndex - 1].status = ElementStates.Default
        setState({...state, result: arr})
        return bubbleSort(arr, finishIndex - 1, 0, direction, setState, state)
    }

    arr[currIndex].status = ElementStates.Changing;
    arr[next].status= ElementStates.Changing;

    if(currIndex - 1 >= 0){
        arr[currIndex - 1].status = ElementStates.Default
    }
    if(direction === Direction.Ascending ? arr[next].value < arr[currIndex].value : arr[next].value > arr[currIndex].value){
        swap(arr, next ,currIndex)
        setState({...state, result: arr})
        return bubbleSort(arr, finishIndex, currIndex + 1, direction, setState, state)
    } else {
        setState({...state, result: arr})
        return bubbleSort(arr, finishIndex, currIndex + 1, direction, setState, state)
    }
    }, DELAY_IN_MS)
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
