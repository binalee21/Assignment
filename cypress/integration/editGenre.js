describe('Edit already existing Genre', () => {
    let genreCountry = ['ES', 'CA'];
    let country = 'ES';
    let countryId = 'Spain';   

    it('Navigate to Genre Management page, Navigate to Genre and verify', () => {
        cy.visit('https://streams.radioedit.ihrint.com/');

        //verify the logo
        cy.get('.logo').should('be.visible');

        //verify heading
        cy.get('h3').should('contain.text', 'Streams');
        cy.wait(5000);

        //Navigate to Genre Management page and verify
        cy.get('.ant-menu-submenu-title')
            .contains('Genres')
            .click();        
        cy.get('a[href="#/genres"]').click();
        cy.get('.ant-select-selection-search-input').should('be.visible');

        //Navigating to test Genre based on country
        let breakLoop = false;
        cy.wrap(genreCountry).each((country) => {
            cy.then(() => {
                if(breakLoop) {
                    country = "CA";
                    countryId = "Canada (CA)"; 
                    return;
                }
                cy.get("[formcontrolname='countries']").click();
                cy.wait(3000);
                cy.get(`.ant-select-item[title="countries/${country}"]`).click();
                cy.wait(3000);
                cy.get(".clickable")
                .should("have.length.gte", 0)
                .then(($streamList) => {
                    if($streamList.length > 0) {
                        cy.get($streamList)
                        .contains("Test_Techo_Genre_Edited (186)")
                        .should("have.length.gte", 0)
                        .then(($stream) => {
                            if($stream.length > 0) {
                                cy.get($stream).click();                                
                                breakLoop = true;
                            }
                        });
                    }
                })
            })
        });
    });

    it('Edit Genre, save and verify save message', () => {
        cy.get('.desktop').contains(' Edit Genre ').should('be.visible');
        cy.get('[data-name="save"]').should('be.disabled');
        cy.typeIntoElementBasedOnLabel('Name', 'Test_Techo_Genre_Edited');
        cy.clickElementsBasedOnLabel('Countries', '[data-icon="close-circle"]');
        cy.clickElementsBasedOnLabel('Countries', 'nz-select-top-control');
        cy.wait(5000);
        cy.get(`[title="${countryId}"] > .ant-select-item-option-content`).click(); 
        cy.get('[data-name="save"]').click();
        cy.get('.ant-notification-notice-content')
            .contains('Success')
            .should('be.visible');
    });

    it('verify changes to all impacted pages', () => {    
        //navigate to genre management page and confirm popup
        cy.get('a[href="#/genres"]').click( {force:true});
        cy.findElementVisibility('.ant-modal-confirm-btns > .ant-btn-primary');

        //verify genre title in selected country   
        cy.get('.ant-select-selection-search-input').click({force:true});
        cy.get(`.ant-select-item[title="countries/${country}"]`).click();
        cy.get('.clickable')
            .contains('Test_Techo_Genre_Edited (186)')
            .scrollIntoView()
            .should('be.visible');                  
    });
});
