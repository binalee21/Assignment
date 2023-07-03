import constant from "../fixtures/constants.json";

describe('Verify Host Management page along with pagination', () => {
    let SEARCH_HOST_TITLE = "";    
    
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
        cy.verifyElementWithText('[routerlink="/hosts/create"]', 'New Host');       
        cy.get('[formcontrolname="query"]').should('be.visible');

        //verifying hostManagement content Header elements
        constant.headerElements.forEach((headerElement) => {
            cy.verifyElementWithText('th', headerElement);
        });

        //fetch last hostTitle text from the hostManagement list
        cy.get('.ant-table-row td:nth-child(2)')
            .last()
            .then((hostTitle) => {
                SEARCH_HOST_TITLE = hostTitle.text();
            });        
    });

    it('verify search functionality using fetched hostTitle track', () => {
        cy.get('[formcontrolname="query"]')
            .clear()
            .type(SEARCH_HOST_TITLE);
        cy.wait(2000);

        //verify search hostTitle text at first row
        cy.get('.ant-table-row td:nth-child(2)')
            .first()
            .should('have.text', SEARCH_HOST_TITLE);
    });

    it('verify pagination with iterating through all pages', () => {
        cy.checkPagination();
    });
});
