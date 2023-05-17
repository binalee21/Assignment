import constant from "../fixtures/example.json";

describe('Clone a playlist and verify the copy created', () => {
    let playListTitleHeader = "";
    let playListTitleTextBox = "";
    let descriptionTextBox = "";
    let authorTextbox = "";
    let startDate = "";
    let endDate = "";
    let tracks = [];
    let cleanToggle;
    let premiumPlaylistToggle;
    let childOrientedToggle;

    it('navigate to first playlist and fetch text of clonable elements', () => {
        //Navigate to first playlist
        cy.get('.app-name').should('have.text','Playlists');
        cy.get('.clickable').eq(0).click();

        //fetching all the elements value and assigning to variables
        cy.get('.ant-card-meta-title')
            .invoke('text')
            .then( elText => {
            playListTitleHeader = elText;            
            });      
        cy.get('#title')
            .invoke('val')
            .then( elText => {
            playListTitleTextBox = elText;
            });
        cy.get('#description')
            .invoke('val')
            .then( elText => {
            descriptionTextBox = elText;
            });
        cy.get('#author')
            .invoke('val')
            .then( elText => {
            authorTextbox = elText;
            });
        cy.get('[placeholder="Select date"]')
            .eq(0)
            .invoke('val')
            .then( elText => {
                startDate = elText;            
            });
        cy.get('[placeholder="Select date"]')
            .eq(1)
            .invoke('val')
            .then( elText => {
                endDate = elText;
            });
        cy.wait(3000);
        cy.get('.tracks-row .ant-col-5')
            .each((el, index, $list) => {
                tracks[index] = el.text();
            });  
        
        //fetching toggle status
        cy.get('[formcontrolname="isExplicit"] button')
            .then( $el => {
                cleanToggle = $el.hasClass("ant-switch-checked");
            }); 
        cy.get('[formcontrolname="isPremium"] button')
            .then( $el => {
                premiumPlaylistToggle = $el.hasClass("ant-switch-checked");
            });
        cy.get('[formcontrolname="isChildOriented"] button')
            .then( $el => {
            childOrientedToggle = $el.hasClass("ant-switch-checked");
            });         
    });

    it('clone playlist and verify', () => {
        //verify tootltip message while hovering to clone button        
        cy.get('[data-name="clone"]')
            .invoke('show')
            .trigger('mouseenter')
            .wait(1000);        
        cy.get('.ant-popover-inner-content').should('have.text', 'Clone this playlist.');

        //click clone and verify
        cy.get('[data-name="clone"]').click();   
        cy.get('.desktop').contains(' Clone Playlist ').should('be.visible');
    });

    it('verify cloned playlist', () => {
        //verify playlist header title  
        cy.get('.ant-card-meta-title').should('have.text', `${playListTitleHeader} (Copy)`);

        //verify Editors Name
        cy.get('[formcontrolname="editors"]').should('have.value', "");

        //verify playlistTitle
        cy.get('#title').should('have.value', `${playListTitleTextBox} (Copy)`);

        //verify playlistDescription
        cy.get('#description').should('have.value', descriptionTextBox);

        //verify playlistAuthor
        cy.get('#author').should('have.value', authorTextbox);

        //verify countries        
        cy.get('[formcontrolname="countries"]').should('have.value', "");        

        //verify startdate and enddate        
        cy.get('[placeholder="Select date"]').eq(0).should('have.value', startDate);
        cy.get('[placeholder="Select date"]').eq(1).should('have.value', endDate);

        //verify all toggles
        if(cleanToggle === true){
            cy.get('[formcontrolname="isExplicit"] button')
                .should('have.class', 'ant-switch-checked');
        }
        if(premiumPlaylistToggle === true){
            cy.get('[formcontrolname="isPremium"] button')
                .should('have.class', 'ant-switch-checked');
        }
        if(childOrientedToggle === true){
            cy.get('[formcontrolname="isChildOriented"] button')
                .should('have.class', 'ant-switch-checked');
        }

        //verify playlistCategories
        cy.get('[formcontrolname="categories"]').should('have.value', "");

        //verify tracks name with search string 
        cy.get('.tracks-row .ant-col-5')
            .each((el, index, $list) => {
                cy.wrap(el).should('have.text', tracks[index]);
            });
    });
});
