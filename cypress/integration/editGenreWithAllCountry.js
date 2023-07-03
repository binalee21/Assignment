describe('Edit already existing Genre', () => {
 
    it('Navigate to Genre Management page, Navigate to Test Genre and verify', () => {
        cy.visit('https://streams.radioedit.ihrint.com/');

        //verify the logo
        cy.get('.logo').should('be.visible');

        //verify heading
        cy.get('h3').should('contain.text', 'Streams');
        cy.wait(5000);

        //Navigate to Genre Management page
        cy.get('.ant-menu-submenu-title').contains('Genres').click();        
        cy.get('a[href="#/genres"]').click();
        cy.get('.ant-select-selection-search-input').should('be.visible');   

        //Select Test Genre present in ES country
        cy.get('.ant-select-selection-search-input').click({force:true});
        cy.get(`.ant-select-item[title="countries/ES"]`).click();
        cy.wait(3000);
        cy.get('.clickable')
            .contains('Test_Techo_Genre_Edited (186)')
            .click();           
    });
 
    it('Edit Test Genre with entering multiple countries, save and verify save message', () => {
        //verifying Elements
        cy.get('.desktop')
            .contains(' Edit Genre ')
            .should('be.visible');
        cy.get('[data-name="save"]').should('be.disabled');

        //Selecting all countries from the list
        cy.clickElementsBasedOnLabel('Countries', '[data-icon="close-circle"]');
        cy.clickElementsBasedOnLabel('Countries', 'nz-select-top-control');
        cy.wait(5000);
        cy.get('.ant-select-item-option-content')
            .each(($el, index, list) => {
                $el.click();
            });     
        
        //save changes and verify
        cy.get('[data-name="save"]').click();
        cy.get('.ant-notification-notice-content')
            .contains('Success')
            .should('be.visible');
    });
 
    it('verify Test Genre title to all entered countries', () => { 
        //navigate to Genre management page and confirm popup
        cy.get('a[href="#/genres"]').click();
        cy.findElementVisibility('.ant-modal-confirm-btns > .ant-btn-primary');     

        //select all present country and verify Test Genre Title
        cy.get('.ant-select-selection-search-input').click({force:true});
        cy.wait(4000)
        cy.get('nz-option-item.ant-select-item')
        .each((el, index, list) => {
            cy.get(`[title="countries/${el.text().trim()}"]`).click({force:true});             
            cy.wait(1000);
            cy.get('.clickable')
                .contains('Test_Techo_Genre_Edited (186)')
                .should('exist'); 
            cy.get('.ant-select-selection-search-input')
                .scrollIntoView()
                .click({force:true});
            cy.wait(1000);
        });
    });

    it('Editing Test Genre back to original data', () => {
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
        cy.get('.ant-select-selection-search-input').click({force:true});
        cy.wait(5000)
        cy.get('nz-option-item.ant-select-item')
            .each((el, index, list) => {
                if((el.text().trim()) !== 'ES')
                {
                    cy.get(`[title="countries/${el.text().trim()}"]`).click({force:true});             
                    cy.wait(1000);
                    cy.get('body').then(($body) => {
                        const element = $body.find('.clickable');
                        if(element.length) 
                            cy.get('.clickable')
                                .contains('Test_Techo_Genre_Edited (186)')
                                .should('not.exist');   
                      });                     
                }
        cy.get('.ant-select-selection-search-input')
            .scrollIntoView()
            .click({force:true});
        cy.wait(1000);             
        });
    });
});
