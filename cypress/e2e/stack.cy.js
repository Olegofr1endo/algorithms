import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  defaultColor,
  changingColor,
  circleSelector,
  circleBorderSelector,
} from "../cypress-constants";
import { checkButtonsList, checkLoader, checkNoLoader } from "../cypress-utils";

export const arrayMaxFilled = [1, 2, 3];

describe("Stack page works correctly", () => {
  before(() => {
    cy.visit(`/stack`);
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

      checkButtonsList(cy.get("button"), 1, checkLoader, "be.disabled");
      cy.get(circleSelector)
        .eq(curStep)
        .should("contain", arrayMaxFilled[curStep])
        .and("contain", "head")
        .and("contain", curStep);
      cy.get(circleBorderSelector)
        .eq(curStep)
        .should("have.css", "border-color", changingColor);

      cy.wait(SHORT_DELAY_IN_MS);
      checkButtonsList(cy.get("button"), 1, checkNoLoader, "be.not.disabled");
      cy.get(circleBorderSelector)
        .eq(curStep)
        .should("have.css", "border-color", defaultColor);
      curStep++;
    }

    curStep--;

    while (curStep >= 0) {
      cy.get("button").eq(2).click();

      checkButtonsList(cy.get("button"), 2, checkLoader, "be.disabled");
      cy.get(circleBorderSelector)
        .eq(curStep)
        .should("have.css", "border-color", changingColor);

      cy.wait(SHORT_DELAY_IN_MS);
      checkNoLoader(cy.get("button").eq(2));
      cy.get(circleSelector).should("have.length", curStep);

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
    cy.get(circleSelector).should("have.length", 0);
  });
});
