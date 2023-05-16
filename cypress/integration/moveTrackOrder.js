import constant from "../fixtures/example.json";

describe('Move track order and verify', () => {
    let trackTitle = "";

    it('search test playlist, fetch track title text which need to be move from playlist', () => {
        //searching for specific testplaylist 
        cy.get('.app-name').should('have.text', 'Playlists');
        cy.get('input[placeholder="Search Title"]').should('be.visible');
        cy.get('[placeholder="Search Title"]').type(constant.testPlaylistName);
        cy.wait(4000);

        //Navigating to first test Playlist page and verify title
        cy.get('.clickable').contains(constant.testPlaylistName).should('be.visible');
        cy.get('.clickable').eq(0).click();
        cy.get('.ant-card-meta-title').should('have.text', constant.testPlaylistName);

        //fetch any track title
        cy.get('.tracks-row:nth-child(4) div:nth-child(4)')
            .invoke("text")
            .then( text => {
                trackTitle = text;
            });
    });

    it('move the track to down, verify new order', () => {        
        //move track title to down
        cy.get('.tracks-row:nth-child(4) [nztype="arrow-down"]').click();

        //verify new order of moved track title
        cy.get('.tracks-row:nth-child(4) div:nth-child(4)').should('not.have.text', trackTitle);
        cy.get('.tracks-row:nth-child(5) div:nth-child(4)').should('have.text', trackTitle);
    });

    it('move the track to up, verify new order', () => { 
        //move track title to up
        cy.get('.tracks-row:nth-child(5) [data-icon="arrow-up"]').click();

        //verify new order of moved track title
        cy.get('.tracks-row:nth-child(4) div:nth-child(4)').should('have.text', trackTitle);
        cy.get('.tracks-row:nth-child(5) div:nth-child(4)').should('not.have.text', trackTitle);
    });
});
