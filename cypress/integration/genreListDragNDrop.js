describe('Genre List editing with drag and drop', () => {
    let genreTitle = "";
    let startRow = 0;
    let destinationRow = 0;
    let randNumbers = [];
 
     it('Navigate to Genre Management page, Navigate to genreList and verify, fetch genre count and generate random numbers', () => {
        cy.visit("https://streams.radioedit.ihrint.com/")
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
        cy.get(`[title="countries/US"]`).last().click();
        cy.wait(3000);  

        //fetch track title of track which needs to be move
        cy.get('[nztype="drag"]').then( $el => {
            cy.getRandomNumbers($el.length).then(data => {
                randNumbers = data;
                startRow = Number(randNumbers[0]) - 1;
                destinationRow = Number(randNumbers[1]) - 1;
            });
        });       
     });

    it('fetch genre title text which need to be drag', () => {         
        cy.get('.clickable').eq(startRow)
            .invoke("text")
            .then( text => {
                genreTitle = text;
            });       
    });
 
     it('Drag and Drop Genre List and verify', () => {
        cy.get('[nztype="drag"]').eq(startRow).as('dragElement');
        cy.get('[nztype="drag"]').eq(destinationRow).as('dropElement');        
        cy.dragList('@dragElement', '@dropElement');
        cy.get('.clickable').eq(destinationRow).should('have.text', genreTitle);           
     });        
 });
