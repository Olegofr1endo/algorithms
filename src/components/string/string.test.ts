import { TValueAndStatus } from "../../types/data"
import { ElementStates } from "../../types/element-states"
import { reverseString } from "../../utils/utils"

const testArr:TValueAndStatus<string>[] = [
    {value: "A",status: ElementStates.Default}, 
    {value: "B", status: ElementStates.Default}, 
    {value: "C", status: ElementStates.Default}, 
    {value: "D", status: ElementStates.Default}
]

const testSuccessResult:TValueAndStatus<string>[] = [
    {value: "D", status: ElementStates.Default},
    {value: "C", status: ElementStates.Default},
    {value: "B", status: ElementStates.Default},
    {value: "A",status: ElementStates.Default}
]

describe("String component tests",()=>{
    it("empty string", ()=>{
        reverseString([]).then((res)=>{
            expect(res).toEqual([])
        })
    })

    it("one symbol", ()=>{
        reverseString([testArr[0]]).then(res=>{
            expect(res).toEqual([testArr[0]])
        })
    })

    it("even", ()=>{
        reverseString(testArr).then(res=>{
            expect(res).toEqual(testSuccessResult)
        })
    })

    it("uneven", ()=>{
        reverseString(testArr.slice(1)).then(res=>{
            expect(res).toEqual(testSuccessResult.slice(1))
        })
    })
})