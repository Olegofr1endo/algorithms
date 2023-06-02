import { getFibonacciNumbers } from "../../utils/utils";

const result = [1,1,2,3,5,8]

describe("Fibonacci component tests", ()=>{
    it("default", ()=>{
        expect(getFibonacciNumbers(5)).toEqual(result)
    })
})