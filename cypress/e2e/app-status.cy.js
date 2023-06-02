import { mainURL } from "../cypress-constants";

describe("service is available", function () {
  it("should be available on localhost:3000", function () {
    cy.visit(mainURL);
  });
});
