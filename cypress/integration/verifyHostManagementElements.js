describe('Verify Host Management page along with pagination', () => {
    let searchHostTitle = "";
    let headerElements = [
        "ID", 
        "Host Name", 
        "Auth Scheme", 
        "Countries", 
        "Country Code", 
        "Stream Type", 
        "Salt"
    ];
    
    it('navigate to Host Management page and verify all elements', () => {
        cy.visit('https://streams.radioedit.ihrint.com/');

        //verify logo and tool name
        cy.get('.logo').should('be.visible');

        //verify heading of the page
        cy.get('h3').should('contain.text', 'Streams');
        cy.wait(2000);
        cy.get('[routerlink="/hosts"]').click();

        //verifying heading elements
        cy.get('h3').should('contain.text', 'Hosts');
        cy.verifyElementWithText('[routerlink="/hosts/create"]', 'New Host ');       
        cy.get('[formcontrolname="query"]').should('be.visible');

        //verifying hostManagement content Header elements
        headerElements.forEach((headerElement) => {
            cy.verifyElementWithText('th', headerElement);
        });

        //fetch last hostTitle text from the hostManagement list
        cy.get('.ant-table-row td:nth-child(2)')
            .last()
            .then( (hostTitle) => {
                searchHostTitle = hostTitle.text();
                cy.log(searchHostTitle);
            });        
    });

    it('verify search functionality using fetched hostTitle track', () => {
        cy.get('[formcontrolname="query"]')
            .clear()
            .type(searchHostTitle);
        cy.wait(2000);

        //verify search hostTitle text at first row
        cy.get('.ant-table-row td:nth-child(2)')
            .first()
            .should('have.text', searchHostTitle);
    });

    it('verify pagination with iterating through all pages', () => {
        cy.checkPagination();
    });
});
