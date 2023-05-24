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

Cypress.Commands.add("fetchElementText", (elementSelector) => {
  return cy.get(elementSelector).invoke('text');
});
Cypress.Commands.add("fetchElementValue", (elementSelector) => {
  return cy.get(elementSelector).invoke('val');
  });


// Cypress.Commands.add("fetchElementText", (elementSelector) => {
//   let text = []; 
//   cy.get(elementSelector)
//     .invoke('text')
//     .then( (data) => {
//       text.push(data);
//       return text.toString();
//     });
// });
// Cypress.Commands.add("fetchElementValue", (elementSelector) => {
//   let text = []; 
//   cy.get(elementSelector)
//     .invoke('val')
//     .then( (data) => {
//       text.push(data);
//       return text.toString(); 
//     });
// });

Cypress.Commands.add("verifyToggle", (status) => {
  if(status === true){
    cy.get('[formcontrolname="isExplicit"] button')
        .should('have.class', 'ant-switch-checked');
  }
});

Cypress.Commands.add("fetchToggleStatus", () => {
  let status = []; 
  cy.get('[formcontrolname="isExplicit"] button')
    .then( $el => {
      status.push($el.hasClass("ant-switch-checked"));
    }); 
  cy.get('[formcontrolname="isPremium"] button')
    .then( $el => {
      status.push($el.hasClass("ant-switch-checked"));
    });
  cy.get('[formcontrolname="isChildOriented"] button')
    .then( $el => {
      status.push($el.hasClass("ant-switch-checked"));
    });    
  return cy.wrap(status);
});

Cypress.Commands.add("verifyElementText", (elementSelector, elementText) => {
  cy.get(elementSelector).should('have.text', elementText);
});

Cypress.Commands.add("verifyElementValue", (elementSelector, elementValue) => {
  cy.get(elementSelector).should('have.value', elementValue);
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
