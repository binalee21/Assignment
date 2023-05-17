describe('Display track number from Dynamic playlist', () => {
    let trackTitle = "";

    it('Select a Dynamic playlist and fetch the track title', () => {
        //select dynamic playlist option from filter
        cy.get('.app-name').should('have.text','Playlists');
        cy.get('button[data-name="playlist-list-filter"]').should('be.visible');        
        cy.get('button[data-name="playlist-list-filter"]').click();
        cy.get('label').contains('Type').should('be.visible');
        cy.get('nz-select[formcontrolname="playlistType"]').click();
        cy.get('nz-option-item[title="Dynamic"] div').click();
        cy.get('[title="Dynamic"]').should('be.visible');
        cy.wait(2000);

        //Navigate to first filtered playlist
        cy.get('.clickable').eq(0).click();
        cy.get('[nztype="warning"].ant-typography')
            .should('have.text', 'This playlist is dynamically updated. Any changes made here will be overridden when new playlists are published by Data Science.  ');
            
        //fetch first track title
        cy.get('playlist-tracks').first().find(`.tracks-row:nth-child(2) div:nth-child(4)`)
            .invoke("text")
            .then( text => {
                trackTitle = text;
            }); 
    });

    it('open track detail, fetch track number and display it', () => {
        //click to open track details
        cy.get('playlist-tracks')
            .first()
            .find('.tracks-row:nth-child(2)')
            .find('[nztype="info-circle"]')
            .click();

        //verify detail popup, fetch track number and display it
        cy.get('.bold a').should('have.text', trackTitle.trim());
        cy.get('.ant-popover-inner-content').contains('Track ID').should('be.visible');
        cy.get('.ant-popover-inner-content').contains('Track ID')
            .then(($el) => {
            const trackNumber = $el.text().split('Track ID:');
            cy.log(`Track Number is -> ${trackNumber[1]}`);
            });
    });
});
