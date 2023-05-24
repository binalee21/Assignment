import constant from "../fixtures/example.json";

describe('Clone a playlist and verify the copy created', () => {
    let playList = {};
    let tracks = [];   

    it('navigate to first playlist and fetch text of clonable elements', () => {
        //Navigate to first playlist
        cy.get('.app-name').should('have.text','Playlists');
        cy.get('.clickable').eq(0).click();

        //playList.playListTitleHeader = cy.fetchElementText('.ant-card-meta-title')        
        cy.fetchElementText('.ant-card-meta-title').then(data => {
            playList.playListTitleHeader = data;
        })
        cy.fetchElementValue('#title').then(data => {
            playList.playListTitleTextBox = data;
        })
        cy.fetchElementValue('#description').then(data => {
            playList.descriptionTextBox = data;
        })
        cy.fetchElementValue('#author').then(data => {
            playList.authorTextbox = data;
        })
        cy.fetchElementValue('[formcontrolname="startDate"] input').then(data => {
            playList.startDate = data;
        })
        cy.fetchElementValue('[formcontrolname="endDate"] input').then(data => {
            playList.endDate = data;
        })
        cy.wait(3000);
        cy.get('.tracks-row .ant-col-5')
            .each((el, index, $list) => {
                tracks[index] = el.text();
            });  
        
        //fetching toggle status
        cy.fetchToggleStatus().then(data => {
            playList.cleanToggle = data[0];
            playList.premiumPlaylistToggle = data[1];
            playList.childOrientedToggle = data[2];
        });      
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
        //verify playlist header title  
        cy.verifyElementText('.ant-card-meta-title', `${playList.playListTitleHeader} (Copy)`);

        //verify Editors Name
        cy.verifyElementValue('[formcontrolname="editors"]', "");

        //verify playlistTitle
        cy.verifyElementValue('#title', `${playList.playListTitleHeader} (Copy)`);
        
        //verify playlistDescription
        cy.verifyElementValue('#description', playList.descriptionTextBox);
        
        //verify playlistAuthor
        cy.verifyElementValue('#author', playList.authorTextbox);
       
        //verify countries        
        cy.verifyElementValue('[formcontrolname="countries"]', "");
        
        //verify startdate and enddate  
        cy.verifyElementValue('[formcontrolname="startDate"] input', playList.startDate);
        cy.verifyElementValue('[formcontrolname="endDate"] input', playList.endDate);      
        
        //verify all toggles
        cy.verifyToggle(playList.cleanToggle);
        cy.verifyToggle(playList.premiumPlaylistToggle);
        cy.verifyToggle(playList.childOrientedToggle);
    
        //verify playlistCategories
        cy.verifyElementValue('[formcontrolname="categories"]', "");
        
        //verify tracks name with search string 
        cy.get('.tracks-row .ant-col-5')
            .each((el, index, $list) => {
                cy.wrap(el).should('have.text', tracks[index]);
            });
    });
    
});
