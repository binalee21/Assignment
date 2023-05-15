import constant from "../fixtures/constants.json";

describe('Create new playlist', () => {

    it('Create Playlist which works with Non-explicit and explicit tracks', () => {
        //click on new playlist button
        cy.get('button.ant-btn > .ng-star-inserted').click();

        //Select Editors value from autocomplete Textbox
        cy.get('[nzerrortip="Editors is required"]').type(constant.editors);
        cy.get('re-tag-content > span').click({ force: true });

        //Entering Title, description and author
        cy.get('#title').type(constant.playlistTitle);
        cy.get('#description').type(constant.playlistDescription);
        cy.get('#author').type(constant.playlistAuthor);

        //image selection        
        cy.get('[data-icon="file-add"').click();
        cy.get('#uploadButton').click();
        cy.get('input[type="file"]').attachFile('ihmLogo.png');
        cy.wait(3000);
        cy.get('re-asset-renderer div').eq(0).click();
        cy.get('i[nztype="check"]').eq(1).click();

        //select multiple countries from dropdown
        cy.get('[formcontrolname="countries"]').click();
        for (var index in constant.countries) {
            cy.get(`[title="playlist-countries/${constant.countries[index]}"]`)
            .click({ force: true });
        };

        //selecting previous month from calrender as startdate
        cy.get('button.ant-btn > .ng-star-inserted').click();
        cy.get('[placeholder="Select date"]').eq(0).click();
        cy.wait(2000);
        cy.get('.ant-picker-header-prev-btn').click();        
        cy.get('.ant-picker-cell-in-view').contains("1").click();        
        cy.get('.ant-picker-ok > .ant-btn').click();
        cy.wait(1000);

        //selecting next month from calender as enddate
        cy.get('[placeholder="Select date"]').eq(1).click();
        cy.get('.ant-picker-header-next-btn').click();
        cy.wait(2000);
        cy.get('.ant-picker-cell-in-view').contains("1").click();
        cy.get('.ant-picker-ok > .ant-btn').click();

        //selecting category from dropdown
        cy.get('[formcontrolname="categories"]').type(constant.playlistCategories);
        cy.get(`[title="activities/${constant.playlistCategories}"]`).click();

        //Turn on Clean toggle
        cy.get('[formcontrolname="isExplicit"]').click();

        //search track songs, select non-explicit and explicit tracks and save playlist  
        for (var index in constant.tracksSearch) {     
            cy.get('.search').eq(0).type(constant.tracksSearch[index]);
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

        //publish playlist and verify
        cy.get('button[data-name="publish"]').first().click({ force: true });
        cy.get('.ant-notification-notice-message').should('have.text', 'Publish Success');
    });
});
