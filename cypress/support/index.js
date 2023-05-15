import './commands';  

beforeEach(() =>{
cy.login(Cypress.config('refreshToken'))
})
