export const checkLoader = (button) => {
  button.get('[data-cypress="loader"]').should("exist");
};

export const checkNoLoader = (button) => {
  button.get('[data-cypress="loader"]').should("not.exist");
};

export const checkButtonsList = (buttonsList, neededIndex, func, condition) => {
  buttonsList.each((button, index) => {
    if (index === 0) {
      return;
    }
    if (index === neededIndex) {
      func(cy.get(button));
    } else {
      cy.get(button).should(condition);
    }
  });
};
