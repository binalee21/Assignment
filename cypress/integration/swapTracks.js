import constant from "../fixtures/example.json";

describe('swap creation and deletion', () => {
    
    it('create a swap', () => {
        //Navigate to swaps dashboard and swap popup
        cy.get('.app-name').should('have.text','Playlists');
        cy.get('a[routerlink="/swaps"]').click();
        cy.get('button[nztype="primary"]').should('have.text','New Swap');
        cy.get('button[nztype="primary"]').click();

        //calling custom command to create swap
        cy.createSwapAndSubmit(constant.firstTrack, constant.secondTrack);
    });

    it('verify created swap', () => {
        //verify created swap track details in swap dashboard
        cy.get('tr:nth-child(1) td:nth-child(1)').should('have.text', constant.firstTrack);
        cy.get('tr:nth-child(1) td:nth-child(6)').should('have.text', constant.secondTrack);

        //verify upload button tooltip text of first swap with mouseEnter event
        cy.get('[nztype="upload"]')
            .eq(0)
            .invoke('show')
            .trigger('mouseenter')
            .wait(1000);        
        cy.get('.ant-tooltip-inner')
            .should('have.text', 'Modify and publish all dynamic playlists containing this track');
    });

    it('delete the swap created and verify', () => {
        //calling custom command to delete swap
        cy.deleteSwap(0);  
        
        //verify swap dashboard for recently deleted swap
        cy.get('a[routerlink="/swaps"]').click();
        cy.get('tr:nth-child(1) td:nth-child(1)').should('not.have.text', constant.firstTrack);
    });
});
