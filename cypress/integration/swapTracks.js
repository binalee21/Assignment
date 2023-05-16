import constant from "../fixtures/example.json";

describe('swap creation and deletion', () => {
    
    it('create a swap, verify and delete the swap created', () => {
        //Navigate to swaps dashboard and swap popup
        cy.get('a[routerlink="/swaps"]').click();
        cy.get('button[nztype="primary"]').click();

        //create new swap and add swap details
        cy.get('[formcontrolname="searchBy"]').first().click();
        cy.get('[title="Search By ID"] div').click();
        cy.get('.search').first().type(constant.firstTrack);
        cy.get('.ant-list-item-meta-title').click();
        cy.get('.search').last().type(constant.secondTrack);
        cy.get('.ant-list-item-meta-title').first().click();

        //submit swap popup and verify success message
        cy.get('[nztype="primary"]').contains(' Submit ').click();
        cy.get('.ant-notification-notice-message').should('be.visible');

        //verify created swap track details in swap dashboard
        cy.get('tr:nth-child(1) td:nth-child(1)').should('have.text', constant.firstTrack);
        cy.get('tr:nth-child(1) td:nth-child(6)').should('have.text', constant.secondTrack);

        //verify upload button tooltip text of first swap
        cy.get('[nztype="upload"]')
            .eq(0)
            .invoke('show')
            .trigger('mouseenter')
            .wait(1000);        
        cy.get('.ant-tooltip-inner')
            .should('have.text', 'Modify and publish all dynamic playlists containing this track');
        
        //delete created swap and verify deletion message
        cy.get('button[nztype="delete"]').first().click();
        cy.get('.ant-btn').contains(' OK ').click();
        cy.get('.ant-notification-notice-description').should('have.text', 'Swap deleted successfully.');
    });
});
