
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

Cypress.Commands.add("createSwapAndSubmit", (firstTrack, secondTrack) => {
  //create new swap, add swap details and verify
  cy.get('.ant-modal-title').should('have.text','Create Swap');        
  cy.get('[formcontrolname="searchBy"]').first().click();
  cy.get('[title="Search By ID"] div').click();
  cy.get('[formcontrolname="searchBy"]').first().should('have.text','Search By ID');  
  cy.get('.search').first().type(firstTrack);
  cy.get('.ant-list-item-meta-title').click();
  cy.get('.display').first().should('have.text',firstTrack);
  cy.get('.search').last().type(secondTrack);
  cy.get('.ant-list-item-meta-title').first().click();
  cy.get('.display').last().should('not.have.text',secondTrack);

  //submit swap popup and verify success message
  cy.get('[nztype="primary"]').contains(' Submit ').click();
  cy.get('.ant-notification-notice-message').should('be.visible');
  cy.get('.ant-notification-notice-close-x').click();
});

Cypress.Commands.add("deleteSwap", (index) => {
  cy.get('button[nztype="delete"]').eq(index).click();
  cy.get('.ant-modal-confirm-title').should('have.text', 'Delete Swap?');        
  cy.get('.ant-btn').contains(' OK ').click();
  cy.get('.ant-notification-notice-description')
    .contains('Swap deleted successfully.')
    .should('be.visible');
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
