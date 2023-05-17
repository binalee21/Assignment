import constant from "../fixtures/example.json";

describe('Clone a playlist and verify the copy created', () => {
    let playListTitleHeader = "";
    let playListTitleTextBox = "";
    let descriptionTextBox = "";
    let authorTextbox = "";
    let startDate = "";
    let endDate = "";
    let tracks = [];

    it('Navigate to first playlist and fetch text of clonable elements', () => {
        //Navigate to first playlist
        cy.get('.app-name').should('have.text','Playlists');
        cy.get('.clickable').eq(0).click();

        //fetching all the elements value and assigning to variables
        cy.get('.ant-card-meta-title').invoke('text').then( elText => {
            playListTitleHeader = elText;
        });
        cy.get('input[id="title"]').then(($el) => {
            playListTitleTextBox = $el.text();
            cy.log($el.text())
            cy.log( playListTitleTextBox );
        });        
        // cy.get('#title').invoke('text').then( elText => {
        //     playListTitleTextBox = elText;
        // });
        cy.get('#description').invoke('text').then( elText => {
            descriptionTextBox = elText;
            cy.log( descriptionTextBox );
        });
        cy.get('#author').invoke('text').then( elText => {
            authorTextbox = elText;
            cy.log( authorTextbox );
        });
        cy.get('[placeholder="Select date"]').eq(0).invoke('text').then( elText => {
            startDate = elText;
            cy.log( startDate );
        });
        cy.get('[placeholder="Select date"]').eq(0).invoke('text').then( elText => {
            endDate = elText;
            cy.log( endDate );
        });
        cy.get('.tracks-row .ant-col-5')
            .each((el, index, $list) => {
                tracks[index] = el.text();
            });        
    });
   
    it('display saved variables', () => {
        //displaying all variables
        cy.log( playListTitleHeader );
        cy.log( playListTitleTextBox );
        cy.log( descriptionTextBox );
        cy.log( authorTextbox );
        cy.log( startDate );
        cy.log( endDate );
        cy.log( tracks[1] );
    })
    it('clone playlist and verify success message', () => {
        //verify tootltip message while hovering to clone button
        
        cy.get('[data-name="clone"]')
            .invoke('show')
            .trigger('mouseenter')
            .wait(1000);        
        cy.get('.ant-popover-inner-content')
            .should('have.text', 'Clone this playlist.');

        //click clone and verify success message
        cy.get('[data-name="clone"]').click();
        cy.wait(1000);

        //verify playlist header title  
        cy.get('.ant-card-meta-title').should('have.text', `${playListTitleHeader} (Copy)`);

        //verify Editors Name
        cy.get('[formcontrolname="editors"]').should('have.value', "");

        //verify playlistDescription
        cy.get('#description').should('not.have.value', "");

        //verify playlistAuthor
        cy.get('#author').should('not.have.value', "");

        //verify countries        
        cy.get('[formcontrolname="countries"]').should('have.value', "");        

        //verify startdate and enddate        
        cy.get('[placeholder="Select date"]').eq(0).should('not.have.value', "")
        cy.get('[placeholder="Select date"]').eq(1).should('not.have.value', "")

        //verify playlistCategories
        cy.get('[formcontrolname="categories"]').should('have.value', "");

        // //verify tracks name with search string 
        // cy.get('.tracks-row .ant-col-5')
        //     .each((el, index, $list) => {
        //         expect(el.text()).includes(constant.tracksSearch);
        //     });
    })

});
  