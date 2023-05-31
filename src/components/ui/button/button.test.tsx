import React from "react";
import { Button } from "./button";
import renderer from "react-test-renderer";

describe("Button component tests", ()=>{
    it("Button with text test", ()=>{
        const tree = renderer.create(<Button text="SomeText"/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

