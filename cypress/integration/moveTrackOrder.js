describe('Move track order and verify', () => {
    let trackTitle = "";
    const startRow = 1;
    const destinationRow = 10;
    let flag = false;

    it('Navigate to first playlist, fetch track title text which need to be move from playlist', () => {
        //Navigating to first test Playlist page and verify title
        cy.get('.app-name').should('have.text','Playlists');
        cy.get('.clickable').eq(0).click();
        cy.contains(' Edit Playlist ').should('be.visible');
       
        //fetch track title of track which needs to be move
        cy.get('.tracks-row').then( $el => {
            if($el.length >= startRow && $el.length >= destinationRow) {
                flag = true;
                cy.get(`.tracks-row:nth-child(${startRow+1}) div:nth-child(4)`)
                .invoke("text")
                .then( text => {
                    trackTitle = text;
                });
            }
        });
        
    });

    it('move the track to down, verify new order', () => {
        //fetch total track count, compare length with start and destination row        
        if(flag == true) {
            //custom command to move tracks down
            cy.moveTrackDown(startRow, destinationRow, trackTitle);
            //custom command to move tracks up
            cy.moveTrackUp(startRow, destinationRow, trackTitle);
        } else {
            cy.log("**** There are not enough Tracks to move! ****");
        }                      
    });
 });
