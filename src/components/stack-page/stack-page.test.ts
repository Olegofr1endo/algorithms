import { ElementStates } from "../../types/element-states";
import Stack from "../../utils/classes/stack";

const stack = new Stack(4)
const node = {value: "A", status: ElementStates.Default}

describe("Stack class tests", ()=>{
    test("stack push and pop", ()=>{
        stack.push(node)
        expect(stack.store).toEqual([node])
        stack.pop()
        expect(stack.store).toEqual([])
    })

    test("stack oversize", ()=>{
        stack.push(node)
        stack.push(node)
        stack.push(node)
        stack.push(node)
        stack.push(node)
        stack.push(node)
        stack.push(node)
        expect(stack.store).toEqual([node,node,node,node])
    })

    test("clear", ()=>{
        stack.push(node)
        stack.push(node)
        stack.push(node)
        stack.push(node)
        stack.clear();
        expect(stack.store).toEqual([])
    })

    test("get", ()=>{
        stack.push(node)
        stack.push(node)

        expect(stack.get()).toEqual(node)
        stack.pop();
        expect(stack.get()).toEqual(node)
        expect(stack.size).toBe(1)
    })
})