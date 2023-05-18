
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

Cypress.Commands.add("paginationNextArrow", () => {
  const paginationNextArrow = () => {
    cy.get('li[title="Next Page"]').then(($el) => {
                      
      if ($el.hasClass('ant-pagination-disabled')) return;
        cy.get('li[title="Next Page"]').click();
        cy.wait(2000);     
        cy.get('.clickable').its('length').should('be.lte', 50).and('gt', 0);   
        paginationNextArrow();         
      });
    }
  paginationNextArrow(); 
});

Cypress.Commands.add("paginationPreviousArrow", () => {
  const paginationPreviousArrow = () => {
    cy.get('li[title="Previous Page"]').then(($el) => { 
                     
      if ($el.hasClass('ant-pagination-disabled')) return;
        cy.get('li[title="Previous Page"]').click();
        cy.wait(2000);
        cy.get('.clickable').its('length').should('be.lte', 50).and('gt', 0);
        paginationPreviousArrow();         
      });
    }
  paginationPreviousArrow(); 
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
