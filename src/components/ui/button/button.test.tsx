import React from "react";
import { Button } from "./button";
import { render, screen, fireEvent } from '@testing-library/react';
import TestRenderer from "react-test-renderer";


const callback = ()=>{
    alert("success")
}

describe("Button component tests", ()=>{
    it("with text", ()=>{
        const tree = TestRenderer.create(<Button text="SomeText"/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("without text", ()=>{
        const tree = TestRenderer.create(<Button/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it ('onload', ()=>{
        const tree = TestRenderer.create(<Button isLoader={true}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('disabled', ()=>{
        const tree = TestRenderer.create(<Button disabled={true}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("event", ()=>{
        window.alert = jest.fn();

        render(<Button text="testButton" onClick={callback}/>)

        const button = screen.getByText("testButton");

        fireEvent.click(button)

        expect(window.alert).toHaveBeenCalledWith("success")
    })
})

