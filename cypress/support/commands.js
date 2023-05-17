
Cypress.Commands.add("login", (refreshToken) => {
  cy.request({
    method: "POST",
    url: `https://auth.radioedit.ihrint.com/token?grant_type=refresh_token&refresh_token=${refreshToken}`
  }).then(response => {
    const accessToken = response.body.access_token;
    cy.setCookie('access_token', accessToken);
    cy.setCookie('access_token_secure', accessToken);
    cy.visit("/");
  });  
});
  
Cypress.Commands.add("moveTrackDown", (startRow, destinationRow, trackTitle) => {
  const numberOfMoves = destinationRow - startRow;
  cy.log(numberOfMoves);
  for(let index = 1; index<=numberOfMoves; index++) {
    cy.get(`.tracks-row:nth-child(${startRow + index}) [nztype="arrow-down"]`).click();
  }
  cy.get(`.tracks-row:nth-child(${destinationRow+1}) div:nth-child(4)`).should('have.text', trackTitle);
});

Cypress.Commands.add("moveTrackUp", (startRow, destinationRow, trackTitle) => {
  const numberOfMoves = Math.abs(startRow - destinationRow);
  cy.log(numberOfMoves);
  for(let index = 0; index<numberOfMoves; index++) {
    cy.get(`.tracks-row:nth-child(${destinationRow + 1 - index}) [nztype="arrow-up"]`).click();
  }
  cy.get(`.tracks-row:nth-child(${startRow+1}) div:nth-child(4)`).should('have.text', trackTitle);
});

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
