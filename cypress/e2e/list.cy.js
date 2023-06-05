import {
  defaultColor,
  changingColor,
  modefiedColor,
  mainURL,
} from "../cypress-constants";
import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from "../../src/constants/delays";
import { checkLoader, checkNoLoader } from "../cypress-utils";

const TestsValue = "A";
const testIndex = 2;

describe("List page works correctly", () => {
  before(() => {
    cy.visit(`${mainURL}/list`);
  });

  it("buttons disabled while string is empty", () => {
    cy.get("button").each((button, index) => {
      if (index === 1 || index === 2 || index > 4) {
        cy.get(button).should("be.disabled");
      }
    });

    cy.get("input").each((input) => {
      cy.get(input).should("be.empty");
    });
  });

  it("list auto-fill works correctly", () => {
    cy.get('[data-cypress="circle"]')
      .should("have.length.at.least", 3)
      .and("have.length.at.most", 6);
  });

  it("head addition works correctly", () => {
    cy.get("input").eq(0).type(TestsValue);
    cy.get("button").eq(1).click();
    checkLoader(cy.get("button").eq(1));

    cy.get('[data-cypress="circle-head"] [data-cypress="circle-color"]')
      .should("contain", TestsValue)
      .and("have.css", "border-color", changingColor);

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[data-cypress="circle"]')
      .eq(0)
      .should("contain", TestsValue)
      .and("contain", "head");

    cy.get('[data-cypress="circle-color"]')
      .eq(0)
      .should("have.css", "border-color", modefiedColor);

    cy.get('[data-cypress="circle-head"] [data-cypress="circle-color"]').should(
      "not.exist"
    );

    cy.wait(SHORT_DELAY_IN_MS);
    checkNoLoader(cy.get("button").eq(1));
    cy.get('[data-cypress="circle-color"]')
      .eq(0)
      .should("have.css", "border-color", defaultColor);
  });

  it("head removing works correctly", () => {
    cy.get("button").eq(3).click();
    checkLoader(cy.get("button").eq(3));

    cy.get('[data-cypress="circle-color"]')
      .eq(0)
      .should("contain", TestsValue)
      .and("have.css", "border-color", changingColor);

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[data-cypress="circle-color"]')
      .eq(0)
      .should("not.contain", TestsValue)
      .and("have.css", "border-color", modefiedColor);

    cy.get('[data-cypress="circle-tail"] [data-cypress="circle-color"]')
      .should("have.css", "border-color", changingColor)
      .and("contain", TestsValue);

    cy.wait(SHORT_DELAY_IN_MS);
    checkNoLoader(cy.get("button").eq(3));
    cy.get('[data-cypress="circle-tail"] [data-cypress="circle-color"]').should(
      "not.exist"
    );
    cy.get('[data-cypress="circle"]')
      .eq(0)
      .should("not.contain", TestsValue)
      .and("contain", "head");
    cy.get('[data-cypress="circle-color"]')
      .eq(0)
      .should("have.css", "border-color", defaultColor);
  });

  it("tail addition works correctly", () => {
    cy.get("input").eq(0).type(TestsValue);
    cy.get("button").eq(2).click();

    checkLoader(cy.get("button").eq(2));
    cy.get('[data-cypress="circle-head"] [data-cypress="circle-color"]')
      .should("contain", TestsValue)
      .and("have.css", "border-color", changingColor);

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[data-cypress="circle"]')
      .eq(-1)
      .should("contain", TestsValue)
      .and("contain", "tail");

    cy.get('[data-cypress="circle-color"]')
      .eq(-1)
      .should("have.css", "border-color", modefiedColor);

    cy.get('[data-cypress="circle-head"] [data-cypress="circle-color"]').should(
      "not.exist"
    );

    cy.wait(SHORT_DELAY_IN_MS);
    checkNoLoader(cy.get("button").eq(2));
    cy.get('[data-cypress="circle-color"]')
      .eq(-1)
      .should("have.css", "border-color", defaultColor);
  });

  it("tail removing works correctly", () => {
    cy.get("button").eq(4).click();

    checkLoader(cy.get("button").eq(4));
    cy.get('[data-cypress="circle-color"]')
      .eq(-1)
      .should("contain", TestsValue)
      .and("have.css", "border-color", changingColor);

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[data-cypress="circle-tail"] [data-cypress="circle-color"]')
      .should("have.css", "border-color", changingColor)
      .and("contain", TestsValue);
    cy.get('[data-cypress="circle-color"]')
      .eq(-2)
      .should("not.contain", TestsValue)
      .and("have.css", "border-color", modefiedColor);

    cy.wait(SHORT_DELAY_IN_MS);
    checkNoLoader(cy.get("button").eq(4));
    cy.get('[data-cypress="circle-tail"] [data-cypress="circle-color"]').should(
      "not.exist"
    );
    cy.get('[data-cypress="circle"]')
      .eq(-1)
      .should("not.contain", TestsValue)
      .and("contain", "tail");
    cy.get('[data-cypress="circle-color"]')
      .eq(-1)
      .should("have.css", "border-color", defaultColor);
  });

  it("addition by index works correclty", () => {
    cy.get("input").eq(0).type(TestsValue);
    cy.get("input").eq(1).type(testIndex);
    cy.get("button").eq(5).click();
    let step = 0;

    while (step < testIndex) {
      for (let i = 0; i <= step + 1; i++) {
        cy.get('[data-cypress="circle-color"]')
          .eq(i)
          .should("have.css", "border-color", changingColor);
      }
      cy.get(
        '[data-cypress="circle-head"] [data-cypress="circle-color"]'
      ).should("contain", TestsValue);
      checkLoader(cy.get("button").eq(5));
      cy.wait(SHORT_DELAY_IN_MS);
      step++;
    }

    checkLoader(cy.get("button").eq(5));
    cy.get('[data-cypress="circle-head"] [data-cypress="circle-color"]').should(
      "not.exist"
    );
    cy.get('[data-cypress="circle-color"]')
      .eq(testIndex)
      .should("contain", TestsValue)
      .and("have.css", "border-color", modefiedColor);

    cy.wait(SHORT_DELAY_IN_MS);
    checkNoLoader(cy.get("button").eq(5));
    cy.get('[data-cypress="circle-color"]')
      .eq(testIndex)
      .should("have.css", "border-color", defaultColor);
  });

  it("deletion by index works correclty", () => {
    cy.get("input").eq(1).type(testIndex);
    cy.get("button").eq(6).click();
    let step = 0;
    while (step <= testIndex) {
      checkLoader(cy.get("button").eq(6));
      for (let i = 0; i <= step; i++) {
        cy.get('[data-cypress="circle-color"]')
          .eq(i)
          .should("have.css", "border-color", changingColor);
      }
      step++;
      cy.wait(SHORT_DELAY_IN_MS);
    }
    checkLoader(cy.get("button").eq(6));
    cy.get('[data-cypress="circle-color"]')
      .eq(step - 1)
      .should("have.css", "border-color", modefiedColor)
      .and("not.contain", TestsValue);
    cy.get('[data-cypress="circle-tail"] [data-cypress="circle-color"]')
      .should("have.css", "border-color", changingColor)
      .and("contain", TestsValue);

    cy.wait(SHORT_DELAY_IN_MS);
    checkNoLoader(cy.get("button").eq(6));
    cy.get('[data-cypress="circle-color"]')
      .eq(step - 1)
      .should("have.css", "border-color", defaultColor)
      .and("not.contain", TestsValue);
  });
});
