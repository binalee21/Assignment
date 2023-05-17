import './commands';  

before(() =>{
cy.login(Cypress.config('refreshToken'))
})
beforeEach(() => {
    Cypress.Cookies.preserveOnce('access_token');
})

