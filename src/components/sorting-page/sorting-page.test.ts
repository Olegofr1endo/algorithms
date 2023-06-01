import { bubbleSort, selectionSort } from "../../utils/utils";
import { TValueAndStatus } from "../../types/data";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";

const testArr:TValueAndStatus<number>[] = [
    {value: 1, status: ElementStates.Default}, 
    {value: 4, status: ElementStates.Default}, 
    {value: 2, status: ElementStates.Default}, 
]

const testAscendingResult:TValueAndStatus<number>[] = [
    {value: 1, status: ElementStates.Modified},
    {value: 2, status: ElementStates.Modified},
    {value: 4, status: ElementStates.Modified}
]

const testDescendingResult:TValueAndStatus<number>[] = [
    {value: 4, status: ElementStates.Modified},
    {value: 2, status: ElementStates.Modified},
    {value: 1, status: ElementStates.Modified}
]

describe("Sorting component tests", ()=>{
    it("bubble empty", async () =>{
        await bubbleSort([], 0, 0, Direction.Ascending, false).then(res=>{
            expect(res).toEqual([])
        })
    })

    it("bubble one element", async () =>{
        await bubbleSort([testArr[0]], 1, 0, Direction.Ascending, false).then(res=>{
            expect(res).toEqual([testAscendingResult[0]])
        })
    })

    it("bubble ascending", async () =>{
        await bubbleSort([...testArr], testArr.length, 0, Direction.Ascending, false).then(res=>{
            expect(res).toEqual(testAscendingResult)
        })
    })

    it("bubble descending", async () =>{
        await bubbleSort([...testArr], testArr.length, 0, Direction.Descending, false).then(res=>{
            expect(res).toEqual(testDescendingResult)
        })
    })

    

    it("selection empty", async () =>{
        await selectionSort([], Direction.Ascending, false).then(res=>{
            expect(res).toEqual([])
        })
    })

    it("selection one element", async () =>{
        await selectionSort([testArr[0]], Direction.Ascending, false).then(res=>{
            expect(res).toEqual([testAscendingResult[0]])
        })
    })

    it("selection ascending", async () =>{
        await selectionSort([...testArr], Direction.Ascending, false).then(res=>{
            expect(res).toEqual(testAscendingResult)
        })
    })

    it("selection descending", async () =>{
        await selectionSort([...testArr], Direction.Descending, false).then(res=>{
            expect(res).toEqual(testDescendingResult)
        })
    })
})