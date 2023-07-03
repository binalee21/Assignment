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
  
Cypress.Commands.add("getRandomNumbers", (maxLength) => {
  let firstNumber;
  let secondNumber;
  do {
    firstNumber = Math.floor(Math.random() * maxLength);
  }while(firstNumber === 0);
  do {
    secondNumber = Math.floor(Math.random() * maxLength);
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
  const startDateString = `${today.getFullYear()}-${previousMonth}-01 ${time[0]}:`
  const endDateString = `${today.getFullYear()}-${nextMonth}-01 ${time[0]}:`
  const dates = [startDateString, endDateString];
  return cy.wrap(dates);
});

Cypress.Commands.add('dragTo',(dragSelector, dropSelector ) => {
  cy.get(dragSelector)
  .scrollIntoView({force: true})
  .trigger('mouseover', {force: true})
  .trigger('mousedown', {button: 0})
  .trigger('mousemove', {force: true});
  cy.get('re-master-detail-content').scrollTo('bottom' , {force: true});
  cy.get(dropSelector)
  .trigger('mousemove', {force: true})
  .click()
  .trigger('mouseup', { force: true})
});

Cypress.Commands.add('findElementVisibility',(locator) => {
  cy.get('body').then(($body) => {
    const element = $body.find(locator);
    if(element.length) element.click();   
  });          
});

Cypress.Commands.add("fetchElementValueWithLabel", (Label, variable) => {
  cy.get('.ant-form-item')
  .contains(Label)
  .parents('nz-form-item').within(() => {
    cy.get('input').invoke('val')
    .then( (data) => {
      variable.push(data);
    });
  });
});

Cypress.Commands.add('clickElementsBasedOnLabel',(label, element) => {
  cy.get('.ant-form-item')
  .contains(label)
  .parents('nz-form-item').within(() => {
    cy.get(element).click({force:true});
  });
});

Cypress.Commands.add('typeIntoElementBasedOnLabel',(label, inptuText) => {
  cy.get('.ant-form-item')
  .contains(label)
  .parents('nz-form-item').within(() => {
    cy.get('input').clear().type(inptuText);
  });
});
  
Cypress.Commands.add('dragList',(dragSelector, dropSelector ) => {
  cy.get(dragSelector)
  .scrollIntoView({force: true})
  .trigger('mouseover', {force: true})
  .trigger('mousedown', {button: 0})
  .trigger('mousemove', {force: true});
  cy.get('re-master-detail-content').scrollTo('bottom' , {force: true});
  cy.get(dropSelector)
  .trigger('mousemove', {force: true})
  .click({force: true})
});

Cypress.Commands.add('clickElementBasedOnLabel',(label) => {
  cy.get('.ant-form-item')
  .contains(label)
  .parents('nz-form-item').within(() => {
    cy.get('input').click({force:true});
  });
});

Cypress.Commands.add('typeIntoElementBasedOnLabel',(label, inptuText) => {
  cy.get('.ant-form-item')
  .contains(label)
  .parents('nz-form-item').within(() => {
    cy.get('input')
      .clear()
      .type(inptuText);
  });
});
  
Cypress.Commands.add('verifyElementWithText',(parentTag, elementText) => {
  cy.get(parentTag)
    .contains(elementText)
    .should('be.visible');
});

Cypress.Commands.add("checkPagination", () => {
  let count = 1;

  //traversing till the last page
  const paginationNextArrow = () => {
    cy.get('li[title="Next Page"]').then(($el) => {
      cy.get(`[title="${count}"]`).should('have.class', 'ant-pagination-item-active');
      count++;            
      if ($el.hasClass('ant-pagination-disabled')) return;        
      cy.get('li[title="Next Page"]').click(); 
      paginationNextArrow();         
    });
  }
  paginationNextArrow();

  //clicking on first page and checking previous arrow is disabled
  cy.get(`[title="1"]`).click();
  cy.get('li[title="Previous Page"]').should('have.class', 'ant-pagination-disabled');
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
