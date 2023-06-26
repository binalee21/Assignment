describe('Verify Host Management page along with pagination', () => {
    let searchString = [];

    it('Navigate to Host Management page and verify all elements', () => {
        cy.visit('https://streams.radioedit.ihrint.com/');

        //verify logo and tool name
        cy.get('.logo').should('be.visible');

        //verify heading
        cy.get('h3').should('contain.text', 'Streams');
        cy.wait(5000);
        cy.get('[routerlink="/hosts"]').click();

        //verifying all elemnts present
        cy.get('h3').should('contain.text', 'Hosts');
        //cy.verifyElementWithText('h3', 'Hosts');
        cy.verifyElementWithText('[routerlink="/hosts/create"]', 'New Host ');        
        cy.get('[formcontrolname="query"]').should('exist');
        cy.verifyElementWithText('th', 'ID' );
        cy.verifyElementWithText('th', 'Host Name');
        cy.verifyElementWithText('th', 'Auth Scheme');
        cy.verifyElementWithText('th', 'Countries');
        cy.verifyElementWithText('th', 'Country Code');
        cy.verifyElementWithText('th', 'Stream Type');
        cy.verifyElementWithText('th', 'Salt'); 
        
        //get random string for searchString
        cy.getRandomString(2, searchString);
    });

    it('verify search functionality using random searchstring', () => {
        cy.get('[formcontrolname="query"]')
            .clear()
            .type(searchString.toString());
        cy.wait(3000);

        //check search string in first page
        cy.get('body').then(($body) => {
            const hostList = $body.find('.ant-table-row td:nth-child(2)');
            if(hostList.length) {
                cy.get('.ant-table-row td:nth-child(2)')
                .each((hostTitle) => {
                    expect(hostTitle.text())
                    .to
                    .contain(searchString.toString())
                });
            }   
        });
    });

    it('verify pagination along with Host count', () => {
        cy.paginationNextArrow();
        cy.paginationPreviousArrow();
    });
});
