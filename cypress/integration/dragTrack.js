import constant from "../fixtures/example.json";

describe('Drag track and verify order', () => {
    let trackTitle = "";

    it('search test playlist, fetch track title text which need to be drag from playlist', () => {
        //searching for specific testplaylist 
        cy.get('[placeholder="Search Title"]').type(constant.testPlaylistName);
        cy.wait(5000);

        //Navigating to first test Playlist page
        cy.get('.clickable').eq(0).click();

        //fetch any track title
        cy.get('.tracks-row:nth-child(4) div:nth-child(4)')
            .invoke("text")
            .then( text => {
                trackTitle = text;
            });
    });

    it('Drag track to another row and verify new order', () => {     
        //const dataTransfer = new DataTransfer();  
       
        //drag track title to down       
        cy.get('.tracks-row:nth-child(4) [nztype="drag"]').eq(0).trigger('dragstart');
        cy.get('.cdk-drag:nth-child(6)').eq(0).trigger('dragenter', { force: true });
        cy.get('.cdk-drag:nth-child(6)').eq(0).trigger('drop', { force: true });
       
        //verify new order of moved track title
        cy.get('.tracks-row:nth-child(4) div:nth-child(4)').should('not.have.text', trackTitle);
        cy.get('.tracks-row:nth-child(6) div:nth-child(4)').should('have.text', trackTitle);

        //move track title to up
        cy.get('.tracks-row:nth-child(5) [data-icon="arrow-up"]').click();

        //verify new order of moved track title
        cy.get('.tracks-row:nth-child(4) div:nth-child(4)').should('have.text', trackTitle);
        cy.get('.tracks-row:nth-child(5) div:nth-child(4)').should('not.have.text', trackTitle);
    });
});