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
