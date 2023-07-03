describe('Drag track and verify order', () => {
    let trackTitle = "";
    let startRow = 0;
    let destinationRow = 0;
    let randNumbers = [];
    let backFillTrackLength = 0;

    it('Navigate to first playlist, fetch track count and generate random numbers', () => {
        //Navigating to first test Playlist page and verify title
        cy.get('.app-name').should('have.text','Playlists');
        cy.get('.clickable').eq(0).click();
        cy.contains(' Edit Playlist ').should('be.visible');
       
        //fetch track title of track which needs to be move
        cy.get('playlist-tracks').first().find('.tracks-row').then( ($el) => {
            cy.getRandomNumbers($el.length).then(data => {
                randNumbers = data;
                startRow = randNumbers[0];
                destinationRow = randNumbers[1];
            });
        });
    });

    it('fetch track title text which need to be drag from playlist', () => {         
        cy.get('playlist-tracks').first().find(`.tracks-row:nth-child(${startRow+1}) div:nth-child(4)`)
            .invoke("text")
            .then( text => {
                trackTitle = text;
            });       
    });

    it('Drag track to another row and verify new order', () => {     
        cy.get(`.tracks-row:nth-child(${startRow+1}) [nztype="drag"]`).eq(0).as('dragElement');
        cy.get('.scroller').eq(1).as('dropElement')
        cy.dragTo('@dragElement', '@dropElement')
       
        //verify new order of moved track title
        cy.get('[additionaltrackname="Primary"] .tracks-row div:nth-child(4)')
            .last()
            .should('have.text', trackTitle);
        cy.get('playlist-tracks')
            .first()
            .find(`.tracks-row:nth-child(${startRow+1}) div:nth-child(4)`)
            .should('not.have.text', trackTitle);
    });
});
