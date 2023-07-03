describe('Check history functionality with editing stream and rejecting changes', () => {
    let streamTitle = [];
    let oldDescription = [];
    let newDescription = Math.random().toString(36).substring(2,10);    

    it('Navigate to Stream page and fetch streamTitle and description of first stream', () => {
        cy.visit('https://streams.radioedit.ihrint.com/');

        //verify logo and tool name
        cy.log(newDescription);
        cy.get('.logo').should('be.visible');

        //verify heading
        cy.get('h3').should('contain.text', 'Streams');
        cy.wait(5000);

        //fetch Stream title and description
        cy.get('.td__stream').eq(0).click();
        cy.get('[data-name="save"]').should('be.disabled');
        cy.fetchElementValueWithLabel('Station Name', streamTitle);
        cy.fetchElementValueWithLabel('Description ', oldDescription);                  
    });

    it('Edit Stream Description, Navigate to history and verify status and FullHistory', () => {
        cy.typeIntoElementBasedOnLabel('Description ',newDescription);

        //save changes and verify
        cy.get('[data-name="save"]').click();
        cy.get('.ant-notification-notice')
            .contains('Success')
            .should('be.visible');    

        //Navigate to history and verify pendingUpdate tag
        cy.get('[data-icon="history"]').click();
        cy.findElementVisibility('.ant-modal-confirm-btns > .ant-btn-primary');
        cy.get('.tagPendingUpdate').should('exist');

        //Navigate to FullHistory page and verify description change
        cy.get('[routerlink="./full"]').click();
        cy.get('.ant-row').eq(0).contains(newDescription).should('exist');        
    });

    it('Compare first two history content with help of Compare functionality and verify', () => {
        cy.get('[routerlink="../"').click();
        cy.wait(5000);
        cy.get('.ant-btn-primary:nth-child(1)').should('be.disabled');
        cy.get('[type="checkbox"]')
            .eq(0)
            .click();
        cy.get('[type="checkbox"]')
            .eq(1)
            .click();
        cy.get('.ant-btn-primary')
            .contains('Compare')
            .click();
        cy.get('.ant-table-tbody')
            .contains(oldDescription.toString())
            .should('exist');
        cy.get('.ant-table-tbody')
            .contains(newDescription)
            .should('exist');
        cy.get('.ant-btn-primary')
            .contains('Hide Compare')
            .click(); 
        cy.get('.ant-btn-primary')
            .contains('Hide Compare')
            .should('not.exist'); 
    });

    it('Navigate to Change Approval page and Reject latest change for fetched stream title', () => {
        cy.get('[routerlink="/changeApproval"]').click();

        //checking for the stream count in the list
        cy.get('[role="tab"]')
            .eq(0)
            .invoke('text')
            .then( (streamCount) => {
                if(streamCount !== 'Pending Changes (1)'){
                    cy.paginationNextArrow();
                    cy.contains(streamTitle.toString()).click();
                }
            });        
        cy.get('.ng-star-inserted')
            .contains('Reject')
            .click();
        cy.get('.ant-notification-notice')
            .contains('Success')
            .should('be.visible');
        cy.wait(2000);
    });

    it('after rejecting the changes, navigate back to the same stream and verify history page', () => {
        cy.get('[routerlink="/streams"]').click();
        cy.contains(streamTitle.toString()).click({force:true});
        cy.wait(2000);
        cy.get('[data-icon="history"]').click();
        cy.wait(3000);
        cy.get('.tagPendingUpdate').should('not.exist');
        cy.get('[routerlink="./full"]').click();
        cy.get('.ant-row')
            .eq(0)
            .contains(newDescription)
            .should('not.exist');
    });
});
