import constant from "../fixtures/constants.json";

describe('Create new playlist', () => {
    let dates = [];

    it('enter all feilds in Create Playlist page', () => {
        //click on new playlist button
        cy.get('.app-name').should('have.text','Playlists');
        cy.get('button.ant-btn > .ng-star-inserted').click();
        cy.get('.desktop').contains(' Create New Playlist ').should('be.visible');

        //Select Editors value from autocomplete Textbox
        cy.get('[nzerrortip="Editors is required"]').type(constant.editors);
        cy.get('re-tag-content > span').click({ force: true });        

        //Entering Title, description and author and verify
        cy.get('#title').type(constant.playlistTitle);
        cy.get('#description').type(constant.playlistDescription);
        cy.get('#author').type(constant.playlistAuthor);

        //image selection        
        cy.uploadImage();

        //select multiple countries from dropdown
        cy.get('[formcontrolname="countries"]').click();
        for (var index in constant.countries) {
            cy.get(`[title="playlist-countries/${constant.countries[index]}"]`)
            .click({ force: true });
        };

        //selecting previous month from calrender as startdate
        cy.enterStartDate();

        //selecting next month from calender as enddate
        cy.enterEndDate()

        //capturing current date and time for verification
        cy.getStartAndEndDates().then(data => {
            dates = data;
        })

        //selecting category from dropdown
        cy.get('[formcontrolname="categories"]').type(constant.playlistCategories);
        cy.get(`[title="activities/${constant.playlistCategories}"]`).click();

        //Turn on Clean toggle
        cy.get('[formcontrolname="isExplicit"]').click();
    });

    it('verify Entered playlist details', () => {
        //verify playlist title 
        cy.get('.ant-card-meta-title').should('have.text', constant.playlistTitle);

        //verify Editors Name
        cy.get('[formcontrolname="editors"]').contains(constant.editors);

        //verify playlistDescription
        cy.get('#description').should('have.value', constant.playlistDescription);

        //verify playlistAuthor
        cy.get('#author').should('have.value', constant.playlistAuthor);

        //verify countries        
        for (var index in constant.countries) {
            cy.get('[formcontrolname="countries"]').contains(constant.countries[index])
        };

        //verify startdate and enddate        
        cy.get('[formcontrolname="startDate"] input').invoke('val').then(($el) => {
            $el.includes(dates[0])
        })
        cy.get('[formcontrolname="endDate"] input').invoke('val').then(($el) => {
            $el.includes(dates[1])
        })
        //cy.get('[formcontrolname="endDate"] input').contains(dates[1])

        //verify playlistCategories
        cy.get(`[title="activities/${constant.playlistCategories}"]`)
            .eq(0)
            .scrollIntoView()
            .should('be.visible');

        //verify checked toggle
        cy.get('.ant-switch-checked').should('be.enabled');

    });

    it('search track songs, select non-explicit and explicit tracks and save playlist', () => {
        for (var index in constant.tracksSearch) {     
            cy.get('playlist-tracks')
                .first()
                .find('.search')
                .type(constant.tracksSearch[index]);
            cy.wait(2000);
            cy.get('.ant-list-item-meta-title')
                .each(($el, index, $list) => {           
                    if(index > 5) return false;            
                    $el.click();                
                });
            cy.wait(2000);  

            //save playlist and verify
            cy.get('button[data-name="save"]').first().click({ force: true });

            //Handling visibility of confirmation popup ok button
            cy.get('body').then(($body) => {
                const buttonConfirmation = $body.find('.ant-modal-confirm-btns > .ant-btn-primary');
                if (buttonConfirmation.length) buttonConfirmation.click();
            });        
            cy.get('.ant-notification-notice-message').should('have.text', 'Save Success');
            cy.get('.ant-notification-notice-close-x').click({ force: true });
        }
    });         
        
    it('publish playlist and verify', () => {        
        cy.get('button[data-name="publish"]').first().click({ force: true });
        cy.get('.ant-notification-notice-message').should('have.text', 'Publish Success');
    });
});
