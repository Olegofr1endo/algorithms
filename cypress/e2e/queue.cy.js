import { defaultColor, changingColor, mainURL } from "../cypress-constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const arrayMaxFilled = [1, 2, 3, 4, 5, 6, 7, 8];
const queueLength = 7;

describe("Queue-page works correctly", () => {
  before(() => {
    cy.visit(`${mainURL}/queue`);
  });

  it("button disabled while string is empty", () => {
    cy.get("button").eq(1).should("be.disabled");
    cy.get("input").should("be.empty");
  });

  it("additional and removing animate works correctly", () => {
    let additionalStep = 0;
    let removingStep = 0;
    let curIndex = 0;

    while (additionalStep < arrayMaxFilled.length) {
      curIndex = additionalStep % queueLength;
      cy.get("input").type(arrayMaxFilled[additionalStep]);
      cy.get("button").eq(1).click();

      cy.get('[data-cypress="circle"]')
        .eq(curIndex)
        .should("contain", "tail")
        .and("contain", curIndex);
      cy.get('[data-cypress="circle-color"]')
        .eq(curIndex)
        .should("have.css", "border-color", changingColor);

      cy.wait(SHORT_DELAY_IN_MS);
      cy.get('[data-cypress="circle-color"]')
        .eq(curIndex)
        .should("have.css", "border-color", defaultColor);

      if (
        removingStep < additionalStep &&
        removingStep < arrayMaxFilled.length - 3
      ) {
        curIndex = removingStep % queueLength;
        cy.get("button").eq(2).click();

        cy.get('[data-cypress="circle"]')
          .eq(curIndex)
          .should("contain", "head");
        cy.get('[data-cypress="circle-color"]')
          .eq(curIndex)
          .should("have.css", "border-color", changingColor);

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('[data-cypress="circle-color"]')
          .eq(curIndex)
          .should("have.css", "border-color", defaultColor);
        cy.get('[data-cypress="circle"]')
          .eq(curIndex)
          .should("not.contain", curIndex)
          .and("not.contain", "head")
          .and("not.contain", arrayMaxFilled[curIndex]);
        removingStep++;
      }
      additionalStep++;
    }
  });

  it("clear button works correctly", () => {
    cy.get("button").eq(3).click();
    cy.get('[data-cypress="circle"]').each((circle, index) => {
      cy.get(circle)
        .should("not.contain", index)
        .and("not.contain", "head")
        .and("not.contain", "tail");
    });
  });
});
