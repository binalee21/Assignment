describe('Clone a playlist and verify the copy created', () => {
    let playList = {
        playListTitleHeader: [],
        playListTitleTextBox: [],
        descriptionTextBox: [],
        authorTextbox: [],
        startDate: [],
        endDate: [],
        cleanToggle: [],
        premiumPlaylistToggle: [],
        childOrientedToggle: []
    };
    let tracks = [];   

    it('navigate to first playlist and fetch text of clonable elements', () => {
        //Navigate to first playlist
        cy.get('.app-name').should('have.text','Playlists');
        cy.get('.clickable').eq(0).click();
    
        //fetching Elements text or value
        cy.fetchElementText('.ant-card-meta-title', playList.playListTitleHeader);
        cy.fetchElementValue('#title', playList.playListTitleTextBox);
        cy.fetchElementValue('#description', playList.descriptionTextBox);
        cy.fetchElementValue('#author', playList.authorTextbox);
        cy.fetchElementValue('[formcontrolname="startDate"] input', playList.startDate);
        cy.fetchElementValue('[formcontrolname="endDate"] input', playList.endDate);
        cy.wait(3000);
        cy.get('.tracks-row .ant-col-5')
            .each((el, index, $list) => {
                tracks[index] = el.text();
            });  
        
        //fetching toggle status
        cy.fetchToggleStatus('[formcontrolname="isExplicit"] button', playList.cleanToggle);
        cy.fetchToggleStatus('[formcontrolname="isPremium"] button', playList.premiumPlaylistToggle);
        cy.fetchToggleStatus('[formcontrolname="isChildOriented"] button', playList.childOrientedToggle);     
    });

    it('check', () => {
        cy.log(playList.playListTitleHeader)
        cy.log(playList.playListTitleTextBox)
        cy.log(playList.descriptionTextBox)
        cy.log(playList.authorTextbox)
        cy.log(playList.startDate)
        cy.log(playList.endDate)
        cy.log(playList.cleanToggle)
        cy.log(playList.premiumPlaylistToggle)
        cy.log(playList.childOrientedToggle)
    })

    it('clone playlist and verify', () => {
        //verify tootltip message while hovering to clone button        
        cy.get('[data-name="clone"]')
            .invoke('show')
            .trigger('mouseenter')
            .wait(1000);        
            cy.verifyElementText('.ant-popover-inner-content', 'Clone this playlist.');

        //click clone and verify
        cy.get('[data-name="clone"]').click();   
        cy.get('.desktop').contains(' Clone Playlist ').should('be.visible');
    });

    it('verify cloned playlist', () => {
        //verify Elements against previously fetched data 
        cy.verifyElementText('.ant-card-meta-title', `${playList.playListTitleHeader} (Copy)`);
        cy.verifyElementValue('[formcontrolname="editors"]', "");
        cy.verifyElementValue('#title', `${playList.playListTitleHeader} (Copy)`);
        cy.verifyElementValue('#description', playList.descriptionTextBox);
        cy.verifyElementValue('#author', playList.authorTextbox);
        cy.verifyElementValue('[formcontrolname="countries"]', ""); 
        cy.verifyElementValue('[formcontrolname="startDate"] input', playList.startDate);
        cy.verifyElementValue('[formcontrolname="endDate"] input', playList.endDate);      
        cy.verifyToggle(playList.cleanToggle);
        cy.verifyToggle(playList.premiumPlaylistToggle);
        cy.verifyToggle(playList.childOrientedToggle);
        cy.verifyElementValue('[formcontrolname="categories"]', "");
        
        //verify tracks name
        cy.get('.tracks-row .ant-col-5')
            .each((el, index, $list) => {
                cy.wrap(el).should('have.text', tracks[index]);
            });
    });    
});
