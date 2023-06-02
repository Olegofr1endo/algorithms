import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { defaultColor, changingColor, mainURL } from "../cypress-constants";

export const arrayMaxFilled = [1, 2, 3];

describe("Stack page works correctly", () => {
  before(() => {
    cy.visit(`${mainURL}/stack`);
  });

  it("button disabled while string is empty", () => {
    cy.get("button").eq(1).should("be.disabled");
    cy.get("input").should("be.empty");
  });

  it("additional and removing animate works correctly", () => {
    let curStep = 0;

    while (curStep < arrayMaxFilled.length) {
      cy.get("input").type(arrayMaxFilled[curStep]);
      cy.get("button").eq(1).click();

      cy.get('[data-cypress="circle"]')
        .eq(curStep)
        .should("contain", arrayMaxFilled[curStep])
        .and("contain", "head")
        .and("contain", curStep);
      cy.get('[data-cypress="circle-color"]')
        .eq(curStep)
        .should("have.css", "border-color", changingColor);

      cy.wait(SHORT_DELAY_IN_MS);
      cy.get('[data-cypress="circle-color"]')
        .eq(curStep)
        .should("have.css", "border-color", defaultColor);
      curStep++;
    }

    curStep--;

    while (curStep >= 0) {
      cy.get("button").eq(2).click();

      cy.get('[data-cypress="circle-color"]')
        .eq(curStep)
        .should("have.css", "border-color", changingColor);

      cy.wait(SHORT_DELAY_IN_MS);
      cy.get('[data-cypress="circle"]').should("have.length", curStep);

      curStep--;
    }
  });

  it("clear button works correctly", () => {
    let curStep = 0;

    while (curStep < arrayMaxFilled.length) {
      cy.get("input").type(arrayMaxFilled[curStep]);
      cy.get("button").eq(1).click();
      curStep++;
      cy.wait(SHORT_DELAY_IN_MS);
    }

    cy.get("button").eq(3).click();
    cy.get('[data-cypress="circle"]').should("have.length", 0);
  });
});
