describe('Edit already existing Genre', () => {
   let genreCountry = ['CA', 'MX', 'AU', 'NZ'];
    let genreCountryEdit = ['CA', 'ES'];
    let genreCountryId = ['Canada (CA)', 'Mexico (MX)', 'Australia (AU)', 'New Zealand (NZ)'];
   
    it('Navigate to Genre Management page, Navigate to Test Genre and verify', () => {
        cy.visit('https://streams.radioedit.ihrint.com/');

        //verify the logo
        cy.get('.logo').should('be.visible');

        //verify heading
        cy.get('h3').should('contain.text', 'Streams');
        cy.wait(5000);

        //Navigate to Genre Management page
        cy.get('.ant-menu-submenu-title')
            .contains('Genres')
            .click();        
        cy.get('a[href="#/genres"]').click();
        cy.get('.ant-select-selection-search-input').should('be.visible'); 

        //Select Test Genre present in ES country
        cy.get('.ant-select-selection-search-input').click({force:true});
        cy.get(`.ant-select-item[title="countries/ES"]`).click();
        cy.wait(3000);
        cy.get('.clickable')
            .contains('Test_Techo_Genre_Edited (186)')
            .click(); 

        //verify Elements
        cy.get('.desktop')
            .contains('Edit Genre')
            .should('be.visible');
        cy.get('[data-name="save"]').should('be.disabled');   
    });

    it('Edit Test Genre with entering multiple countries, save and verify save message', () => {       
        //select all countries present in testdata
        cy.clickElementsBasedOnLabel('Countries', '[data-icon="close-circle"]');
        cy.clickElementsBasedOnLabel('Countries', 'nz-select-top-control');
        cy.wait(5000);    
        genreCountryId.forEach((countryId) => {
            cy.get(`[title="${countryId}"] > .ant-select-item-option-content`).click();
        });

        //save changes and verify
        cy.get('[data-name="save"]').click();
        cy.get('.ant-notification-notice-content')
            .contains('Success')
            .should('be.visible');
    });

    it('verify Test Genre title to all entered countries', () => { 
        //Navigate to genre management page and confirm popup
        cy.get('a[href="#/genres"]').click();
        cy.findElementVisibility('.ant-modal-confirm-btns > .ant-btn-primary');

        //Select all country and verify test genre title in list
        genreCountry.forEach((country) => {     
            cy.get('.ant-select-selection-search-input')
                .scrollIntoView()
                .click({force:true});
            cy.get(`.ant-select-item[title="countries/${country}"]`).click();
            cy.wait(2000);
            cy.get('.clickable')
                .contains('Test_Techo_Genre_Edited (186)')
                .scrollIntoView()
                .should('be.visible');                  
        });
    });
    
    it('Editing Test Genre back to original data', () => {
        cy.get('.ant-select-selection-search-input')
            .scrollIntoView()
            .click({force:true});
        cy.get(`.ant-select-item[title="countries/ES"]`).click();
        cy.get('.clickable')
            .contains('Test_Techo_Genre_Edited (186)')
            .click();
        cy.clickElementsBasedOnLabel('Countries', '[data-icon="close-circle"]');
        cy.clickElementsBasedOnLabel('Countries', 'nz-select-top-control');
        cy.wait(5000);
        cy.get('[title="Spain"] > .ant-select-item-option-content').click();
        cy.get('[data-name="save"]').click();
        cy.get('.ant-notification-notice-content')
            .contains('Success')
            .should('be.visible');
    });

    it('verify impacted changes to all entered countries', () => {
        //Navigate to genre management page and confirm popup
        cy.get('a[href="#/genres"]').click();
        cy.findElementVisibility('.ant-modal-confirm-btns > .ant-btn-primary');

        //Select all country and verify test genre title in list
        genreCountry.forEach((country) => {                 
            cy.get('.ant-select-selection-search-input')
                .scrollIntoView()
                .click({force:true});
            cy.get(`.ant-select-item[title="countries/${country}"]`).click();
            cy.wait(2000);
            cy.get('.clickable')
                .contains('Test_Techo_Genre_Edited (186)')
                .should('not.exist');                  
        });
    });
});
