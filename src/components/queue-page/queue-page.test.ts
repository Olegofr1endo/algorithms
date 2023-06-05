import Queue from "../../utils/classes/queue";
import { ElementStates } from "../../types/element-states";

const queue = new Queue(4);
const node = {value: "A", status: ElementStates.Default}
const typeTwoNode = {value: "B", status: ElementStates.Default}

describe("Queue class tests", ()=>{
    test("addition and removing test", ()=>{
        queue.enqueue(node)
        expect(queue.store).toEqual([node,undefined,undefined,undefined])
        queue.dequeue();
        expect(queue.store).toEqual([undefined,undefined,undefined,undefined])
    })

    test("oversize test", ()=>{
        queue.enqueue(node)
        queue.enqueue(node)
        queue.enqueue(node)
        queue.enqueue(node)
        queue.enqueue(node)
        expect(queue.store).toEqual([node,node,node,node])
    })

    test("looped", ()=>{
        queue.enqueue(node)
        queue.enqueue(node)
        queue.enqueue(node)
        queue.enqueue(node)
        queue.dequeue()
        queue.enqueue(typeTwoNode)
        expect(queue.store).toEqual([typeTwoNode,node,node,node])
    })

    test("clear", ()=>{
        queue.enqueue(node)
        queue.enqueue(node)
        queue.clear()
        expect(queue.store).toEqual([undefined,undefined,undefined,undefined])
    })

    test("get", ()=>{
        queue.enqueue(node)
        queue.enqueue(typeTwoNode)

        expect(queue.get()).toEqual(node)
        queue.dequeue()
        expect(queue.get()).toEqual(typeTwoNode)
    })
})