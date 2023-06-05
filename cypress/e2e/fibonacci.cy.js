import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { mainURL } from "../cypress-constants";
import { checkLoader, checkNoLoader } from "../cypress-utils";

const fibList = [1, 1, 2, 3, 5, 8]; // В массив можно внести любое кол-во чисел последовательности Фибоначчи

describe("Fibonacci page works correctly", () => {
  before(() => {
    cy.visit(`${mainURL}/fibonacci`);
  });

  it("button disabled while string is empty", () => {
    cy.get("button").eq(1).should("be.disabled");
    cy.get("input").should("be.empty");
  });

  it("animation works correctly", () => {
    cy.get("input").type(fibList.length - 1);
    cy.get("button").eq(1).click();
    let step = 0;

    checkLoader(cy.get("button").eq(1));

    while (step < fibList.length) {
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get('[data-cypress="circle"]').each((circle, index) => {
        cy.get(circle).should("contain", fibList[index]).and("contain", index);
      });
      step++;
    }

    checkNoLoader(cy.get("button").eq(1));
  });
});
