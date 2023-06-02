import { DELAY_IN_MS } from "../../src/constants/delays";
import {
  mainURL,
  defaultColor,
  changingColor,
  modefiedColor,
} from "../cypress-constants";

const string = "abcde";

const firstStep = [
  { textContent: "a", color: changingColor },
  { textContent: "b", color: defaultColor },
  { textContent: "c", color: defaultColor },
  { textContent: "d", color: defaultColor },
  { textContent: "e", color: changingColor },
];

const secondStep = [
  { textContent: "e", color: modefiedColor },
  { textContent: "b", color: changingColor },
  { textContent: "c", color: defaultColor },
  { textContent: "d", color: changingColor },
  { textContent: "a", color: modefiedColor },
];

const thirdStep = [
  { textContent: "e", color: modefiedColor },
  { textContent: "d", color: modefiedColor },
  { textContent: "c", color: modefiedColor },
  { textContent: "b", color: modefiedColor },
  { textContent: "a", color: modefiedColor },
];

describe("String-page works correctly", () => {
  before(() => {
    cy.visit(`${mainURL}/recursion`);
  });

  it("button disabled while string is empty", () => {
    cy.get("button").eq(1).should("be.disabled");
    cy.get("input").should("be.empty");
  });

  it("animation works correctly", () => {
    cy.get("input").type(string);
    cy.get("button").eq(1).click();

    cy.wait(DELAY_IN_MS);
    cy.get("[data-cypress='circle-color']").each((circle, index) => {
      cy.get(circle).should("contain", firstStep[index].textContent);
      cy.get(circle).should("have.css", "border-color", firstStep[index].color);
    });

    cy.wait(DELAY_IN_MS);
    cy.get("[data-cypress='circle-color']").each((circle, index) => {
      cy.get(circle).should("contain", secondStep[index].textContent);
      cy.get(circle).should(
        "have.css",
        "border-color",
        secondStep[index].color
      );
    });

    cy.wait(DELAY_IN_MS);
    cy.get("[data-cypress='circle-color']").each((circle, index) => {
      cy.get(circle).should("contain", thirdStep[index].textContent);
      cy.get(circle).should("have.css", "border-color", thirdStep[index].color);
    });
  });
});
