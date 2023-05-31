describe('Move track order and verify', () => {
    let trackTitle = "";
    let startRow = 0;
    let destinationRow = 0;
    let randNumbers = [];

    it('Navigate to first playlist, fetch track count and generate random numbers', () => {
        //Navigating to first test Playlist page and verify title
        cy.get('.app-name').should('have.text','Playlists');
        cy.get('.clickable').eq(0).click();
        cy.contains(' Edit Playlist ').should('be.visible');
       
        //fetch track title of track which needs to be move
        cy.get('playlist-tracks').first().find('.tracks-row').then( $el => {
            cy.getRandomNumbers($el.length).then(data => {
                randNumbers = data;
                startRow = randNumbers[0];
                destinationRow = randNumbers[1];
            });
        });
    });

    it('fetch track title text which need to be move from playlist', () => {         
        cy.get('playlist-tracks').first().find(`.tracks-row:nth-child(${startRow+1}) div:nth-child(4)`)
            .invoke("text")
            .then( text => {
                trackTitle = text;
            });       
    });

    it('move the track & verify new order', () => {       
        if(startRow < destinationRow) {
            //custom command to move tracks down
            cy.moveTrackDown(startRow, destinationRow, trackTitle);           
        } else {
            //custom command to move tracks up
            cy.moveTrackUp(startRow, destinationRow, trackTitle);
        }  
        
        //verify moved track title
        cy.get('playlist-tracks')
        .first()
        .find(`.tracks-row:nth-child(${destinationRow+1}) div:nth-child(4)`)
        .should('have.text', trackTitle); 
    });
 });
