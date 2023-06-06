import { TValueAndStatus } from "../../types/data"
import { ElementStates } from "../../types/element-states"
import { reverseString } from "../../utils/utils"

const testArr:TValueAndStatus<string>[] = [
    {value: "A", status: ElementStates.Default}, 
    {value: "B", status: ElementStates.Default}, 
    {value: "C", status: ElementStates.Default}, 
    {value: "D", status: ElementStates.Default}
]

const testSuccessResult:TValueAndStatus<string>[] = [
    {value: "D", status: ElementStates.Modified},
    {value: "C", status: ElementStates.Modified},
    {value: "B", status: ElementStates.Modified},
    {value: "A", status: ElementStates.Modified}
]

describe("String component tests",()=>{
    test("empty string", async ()=>{
         await reverseString([], false).then((res)=>{
            expect(res).toEqual([])
        })
    })

    test("one symbol", async ()=>{
         await reverseString([testArr[0]], false).then(res=>{
            expect(res).toEqual([testSuccessResult[3]])
        })
    })

    test("even", async ()=>{
         await reverseString(testArr, false).then(res=>{
            expect(res).toEqual(testSuccessResult)
        })
    })

    test("uneven", async ()=>{
         await reverseString(testArr.slice(1), false).then(res=>{
            expect(res).toEqual(testSuccessResult.slice(0, 3))
        })
    })
})