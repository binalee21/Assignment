
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

Cypress.Commands.add("getRandomNumbers", () => {
  let firstNumber;
  let secondNumber;
  do {
    firstNumber = Math.floor(Math.random() * 7);
  }while(firstNumber === 0);
  
  do {
    secondNumber = Math.floor(Math.random() * 7);
  } while(firstNumber === secondNumber || secondNumber === 0); 

  let random = [firstNumber, secondNumber];
  return cy.wrap(random);
});

Cypress.Commands.add("moveTrackDown", (startRow, destinationRow, trackTitle) => {
  for(let index = 1; index <= (destinationRow - startRow); index++) {
    cy.get('playlist-tracks')
      .first()
      .find(`.tracks-row:nth-child(${startRow + index}) [nztype="arrow-down"]`)
      .click();
  }  
});

Cypress.Commands.add("moveTrackUp", (startRow, destinationRow, trackTitle) => {
  for(let index = 0; index < (startRow - destinationRow); index++) {
    cy.get('playlist-tracks')
      .first()
      .find(`.tracks-row:nth-child(${startRow + 1 - index}) [nztype="arrow-up"]`)
      .click();
  }
});

// Cypress.Commands.add("generateTwoRandomNumber", () => {
//   let firstNumber;
//   let secondNumber;
//   firstNumber = Math.floor(Math.random() * 10);
//   cy.log(firstNumber);
//   do {
//     secondNumber = Math.floor(Math.random() * 10);
//   } while(secondNumber === firstNumber);  
//   cy.log(secondNumber);
//   //const randomNumber = [firstNumber, secondNumber];
//   //return cy.wrap(randomNumber);
// });

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
