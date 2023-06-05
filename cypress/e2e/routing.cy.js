describe("routing is working correctly", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("String route", () => {
    cy.get('[href="/recursion"]').click();
    cy.contains("Строка");
  });

  it("Fibonacci route", () => {
    cy.get('[href="/fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });

  it("Sorting route", () => {
    cy.get('[href="/sorting"]').click();
    cy.contains("Сортировка массива");
  });

  it("Stack route", () => {
    cy.get('[href="/stack"]').click();
    cy.contains("Стек");
  });

  it("Queue route", () => {
    cy.get('[href="/queue"]').click();
    cy.contains("Очередь");
  });

  it("List route", () => {
    cy.get('[href="/list"]').click();
    cy.contains("Связный список");
  });
});
