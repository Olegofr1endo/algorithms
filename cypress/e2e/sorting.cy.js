// Хотел сделать проверку по сортировке, но никак не могу придумать путь.
// Упираюсь в то, что не могу получить длинну массива элементов
describe("Sorting component tests", () => {
  before(() => {
    cy.visit(`/sorting`);
  });

  it("button states", () => {
    cy.get("button").each((button, index) => {
      if (index === 0) {
        return;
      }
      if (index === 3) {
        cy.get(button).should("be.not.disabled");
      } else {
        cy.get(button).should("be.disabled");
      }
    });
  });

  it("list generates correctly", () => {
    cy.get('[data-cypress="column"]')
      .should("have.length.at.least", 3)
      .and("have.length.at.most", 17);
  });
});
