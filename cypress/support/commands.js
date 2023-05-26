import 'cypress-file-upload';

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
 });
  
Cypress.Commands.add("searchSwap", (trackId) => {
  cy.get('input[formcontrolname="fromId"]').clear().type(trackId);
  cy.wait(2000);
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

Cypress.Commands.add("deleteSwap", () => {
  cy.get('button[nztype="delete"]').click();
  cy.get('.ant-modal-confirm-title').should('have.text', 'Delete Swap?');        
  cy.get('.ant-btn').contains(' OK ').click();
  cy.get('.ant-notification-notice-description')
    .contains('Swap deleted successfully.')
    .should('be.visible');
});

Cypress.Commands.add("uploadImage", () => {
  cy.get('[data-icon="file-add"').click();
  cy.get('#uploadButton').click();
  cy.get('input[type="file"]').attachFile('ihmLogo.png');
  cy.wait(3000);
  cy.get('re-asset-renderer div').eq(0).click();
  cy.get('i[nztype="check"]').eq(1).click();
});

Cypress.Commands.add("enterStartDate", () => {
  //cy.get('button.ant-btn > .ng-star-inserted').click();
  cy.get('[formcontrolname="startDate"] input').click();
  cy.wait(2000);
  cy.get('.ant-picker-header-prev-btn').click();        
  cy.get('.ant-picker-cell-in-view').contains("1").click();        
  cy.get('.ant-picker-ok > .ant-btn').click();
  cy.wait(1000);
});

Cypress.Commands.add("enterEndDate", () => {
  cy.get('[formcontrolname="endDate"] input').click();
  cy.get('.ant-picker-header-next-btn').click();
  cy.wait(2000);
  cy.get('.ant-picker-cell-in-view').contains("1").click();
  cy.get('.ant-picker-ok > .ant-btn').click();
});

Cypress.Commands.add("getStartAndEndDates", () => {
  const today = new Date();
  const time = today.toTimeString().split(' ')[0].split(':');        
  let previousMonth = (today.getMonth()).toString().padStart(2, "0");
  let nextMonth = (today.getMonth() + 2).toString().padStart(2, "0");
  const startDateString = `${today.getFullYear()}-${previousMonth}-01 ${time[0]}:${time[1]}`
  const endDateString = `${today.getFullYear()}-${nextMonth}-01 ${time[0]}:${time[1]}`
  const dates = [startDateString, endDateString];
  return cy.wrap(dates);
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
