require('@4tw/cypress-drag-drop')

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

Cypress.Commands.add("fetchElementText", (elementSelector, variable) => {
  cy.get(elementSelector)
    .invoke('text')
    .then( (data) => {
      variable.push(data);
    });
});

Cypress.Commands.add("fetchElementValue", (elementSelector, variable) => {
  cy.get(elementSelector)
    .invoke('val')
    .then( (data) => {
      variable.push(data);
    });
});

Cypress.Commands.add("fetchToggleStatus", (elementSelector, variable) => {
  cy.get(elementSelector)
    .then( $el => {
      variable.push($el.hasClass("ant-switch-checked"));
   });
});

Cypress.Commands.add("verifyElementText", (elementSelector, elementText) => {
  cy.get(elementSelector).should('have.text', elementText.toString());
});

Cypress.Commands.add("verifyElementValue", (elementSelector, elementValue) => {
  cy.get(elementSelector).should('have.value', elementValue.toString());
});

Cypress.Commands.add("verifyToggle", (status) => {
  if(status === true){
    cy.get('[formcontrolname="isExplicit"] button')
        .should('have.class', 'ant-switch-checked');
  }
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
