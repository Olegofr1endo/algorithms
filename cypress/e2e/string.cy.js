import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  defaultColor,
  changingColor,
  modefiedColor,
  circleBorderSelector,
} from "../cypress-constants";
import { checkLoader, checkNoLoader } from "../cypress-utils";

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
    cy.visit("/recursion");
  });

  it("button disabled while string is empty", () => {
    cy.get("button").eq(1).should("be.disabled");
    cy.get("input").should("be.empty");
  });

  it("animation works correctly", () => {
    cy.get("input").type(string);
    cy.get("button").eq(1).click();

    checkLoader(cy.get("button").eq(1));

    cy.wait(DELAY_IN_MS);
    checkLoader(cy.get("button").eq(1));
    cy.get(circleBorderSelector).each((circle, index) => {
      cy.get(circle)
        .should("contain", firstStep[index].textContent)
        .and("have.css", "border-color", firstStep[index].color);
    });

    cy.wait(DELAY_IN_MS);
    checkLoader(cy.get("button").eq(1));
    cy.get(circleBorderSelector).each((circle, index) => {
      cy.get(circle)
        .should("contain", secondStep[index].textContent)
        .and("have.css", "border-color", secondStep[index].color);
    });

    cy.wait(DELAY_IN_MS);
    checkNoLoader(cy.get("button").eq(1));
    cy.get(circleBorderSelector).each((circle, index) => {
      cy.get(circle)
        .should("contain", thirdStep[index].textContent)
        .and("have.css", "border-color", thirdStep[index].color);
    });

    // Если возможно - объясните пожалуйста ошибку кода ниже.
    // Пытался сделать проверку для любой кастомной строки при помощи циклов,
    // но упираюсь в какую-то проблему. С while или for сначала отрабатывают анимации, а потом начинаются
    // проверки на уже полностью перевернутой строке, а метод each в принципе работает таким образом,
    // что начинает перебор для каждой итерации только по окончанию цикла.
    // Т.е. если перебор зависит от некоторой i, которая меняется на каждом шагу цикла, - each
    // произведет все расчеты отталкиваясь от конечного значения i после завершения цикла.

    /*cy.get("input").type(string);
    cy.get("button").eq(1).click();

    let b = string.length - 1;
    let a = 0;
    let i = 0;
    const arr = string.split("");

    while (a < b) {
      while (i < a) {
        cy.get("[data-cypress='circle-color']")
          .eq(i)
          .should("have.css", "border-color", modefiedColor);
        i++;
      }
      cy.get("[data-cypress='circle-color']")
        .eq(a)
        .should("have.css", "border-color", modefiedColor);
      i++;
      while (i < b) {
        cy.get("[data-cypress='circle-color']")
          .eq(i)
          .should("have.css", "border-color", modefiedColor);
        i++;
      }
      cy.get("[data-cypress='circle-color']")
        .eq(b)
        .should("have.css", "border-color", modefiedColor);
      i++;
      while (i <= string.length - 1) {
        cy.get("[data-cypress='circle-color']")
          .eq(i)
          .should("have.css", "border-color", modefiedColor);
        i++;
      }
      i = 0;
      b--;
      a++;
      cy.wait(DELAY_IN_MS);
    }
    */
  });
});
