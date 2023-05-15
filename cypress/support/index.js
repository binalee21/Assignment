import './commands';  

before(() =>{
cy.login(Cypress.config('refreshToken'))
})
