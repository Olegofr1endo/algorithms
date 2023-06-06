import LinkedList from "../../utils/classes/linked-list"
import { randomArr } from "../../utils/utils"

const list = new LinkedList(9, randomArr(3,6,9999))
const node = {"head": "", "state": "default", "tail": "", "value": "A"};

describe("List class tests", ()=>{
    test("toArray", ()=>{
        expect(list.toArray()).toBeInstanceOf(Array)
    })

    test("addition and removing from head", ()=>{
        list.prepend("A")
        let array = list.toArray()
        expect(array[0]).toEqual(node)
        list.deleteHead();
        array = list.toArray()
        expect(array[0]).not.toEqual(node)
    })

    test("addition and removing from tail", ()=>{
        list.append("A")
        let array = list.toArray()
        expect(array[array.length-1]).toEqual(node)
        list.deleteTail();
        array = list.toArray()
        expect(array[array.length-1]).not.toEqual(node)
    })

    test("addition and removing by index", ()=>{
        list.addByIndex("A", 2)
        let array = list.toArray()
        expect(array[2]).toEqual(node)
        list.deleteByIndex(2);
        array = list.toArray()
        expect(array[2]).not.toEqual(node)
    })
})