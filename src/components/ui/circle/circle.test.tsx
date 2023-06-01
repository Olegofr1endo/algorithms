import React from "react"
import { Circle } from "./circle"
import TestRenderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";

const reactElement = <div>div-block</div>

describe("Circle component tests", ()=>{
    it("without letter", ()=>{
        const tree = TestRenderer.create(<Circle />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("with letter", ()=>{
        const tree = TestRenderer.create(<Circle letter="A"/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("with head", ()=>{
        const tree = TestRenderer.create(<Circle head="head"/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("with element-head", ()=>{
        const tree = TestRenderer.create(<Circle head={reactElement}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("with tail", ()=>{
        const tree = TestRenderer.create(<Circle tail="tail"/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("with element-tail", ()=>{
        const tree = TestRenderer.create(<Circle tailType="element" tail={reactElement}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("with index", ()=>{
        const tree = TestRenderer.create(<Circle index={0}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("small", ()=>{
        const tree = TestRenderer.create(<Circle isSmall={true}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("default", ()=>{
        const tree = TestRenderer.create(<Circle state={ElementStates.Default}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("changing", ()=>{
        const tree = TestRenderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("modified", ()=>{
        const tree = TestRenderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})