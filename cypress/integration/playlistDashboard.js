import constant from "../fixtures/example.json";

describe('Verify all the elements in playlist list page', () => {

    it('Verify logo and header', () => {
        cy.get('#RE_Logo').should('be.visible');
        cy.get('.env').should('have.text', ' stage ');
        cy.get('.app-name').should('have.text', 'Playlists');        
    });

    it('Verify leftside Menu', () => {
        cy.get('a[routerlink="/playlists"]').should('be.visible');
        cy.get('a[routerlink="/swaps"]').should('be.visible');
        cy.get('.ant-menu-item span').contains(constant.username).should('be.visible');
        cy.get('a[href*="/sign_out"]').should('be.visible');    

        //Navigate to Help page and verify
        cy.get('a[href="/help"]').should('be.visible');
        cy.get('a[href="/help"]').click();
        cy.get('.text-center').contains('Contact Support:').should('be.visible');
        cy.get('a[routerlink="/playlists"]').click();

        //Collapse and expand left menu and verify
        cy.get('.anticon-left-circle').click({force : true});
        cy.wait(2000);
        cy.get('a[routerlink="/playlists"]').should('not.be.visible');
        cy.get('.anticon-right-circle').click({force : true});
        cy.wait(2000);
        cy.get('a[routerlink="/playlists"]').should('be.visible');
    });

    it('Verify NewPlaylist, Navigate to Newplaylist and navigate back', () => {
        cy.get('.ng-star-inserted').contains('New Playlist ').should('be.visible');
        cy.get('.ng-star-inserted').contains('New Playlist ').click();
        cy.get('.desktop').contains(' Create New Playlist ').should('be.visible');
        cy.go('back');
        cy.get('.ng-star-inserted').contains('New Playlist ').should('be.visible');
        cy.go('forward');
        cy.get('.desktop').contains(' Create New Playlist ').should('be.visible');
        cy.go('back');
    });

    it('Verify search box, Enter search string & verify result', () => {
        cy.get('[placeholder="Search Title"]').should('be.visible');
        cy.get('[formcontrolname="title"]').type(constant.playlistTitle);
        cy.get('[formcontrolname="title"]').should('have.value', constant.playlistTitle);
        cy.wait(2000);
        cy.get('.ant-table-row:nth-child(1) .clickable')
            .should('have.text', `${constant.playlistTitle} `);
        cy.get('[formcontrolname="title"]').clear();
    });

    it('Verify Filter button and its all sub options', () => {
        cy.get('[data-name="playlist-list-filter"]').should('be.visible');
        cy.get('[data-name="playlist-list-filter"]').click();
        cy.get('.ant-form-item-label label').contains('Type').should('be.visible');
        cy.get('[formcontrolname="playlistType"]').contains('Select All').should('be.visible');
        
        cy.get('.ant-form-item-label label').contains('Status').should('be.visible');
        cy.get('[formcontrolname="status"]').contains('Select All').should('be.visible');
        
        cy.get('.ant-form-item-label label').contains('Curator').should('be.visible');
        cy.get('[formcontrolname="curator"]').should('be.visible');

        cy.get('.ant-form-item-label label').contains('Editor').should('be.visible');
        cy.get('[formcontrolname="editors"]').should('be.visible');

        cy.get('.ant-form-item-label label').contains('Category').should('be.visible');
        cy.get('[formcontrolname="categories"]').should('be.visible');

        cy.get('.ant-form-item-label label').contains('Country').should('be.visible');
        cy.get('[formcontrolname="countries"]').should('be.visible');

        cy.get('.ant-form-item-label label').contains('Exclude Country').should('be.visible');
        cy.get('[formcontrolname="exclusions"]').should('be.visible');

        cy.get('.ant-form-item-label label')
            .contains('Child Oriented')
            .scrollIntoView()
            .should('be.visible');
        cy.get('[formcontrolname="isChildOriented"] label:nth-child(1)')
            .should('have.class', 'ant-radio-wrapper-checked');

        cy.get('.ant-form-item-label label').contains('Clean').should('be.visible');
        cy.get('[formcontrolname="clean"] label:nth-child(1)')
            .should('have.class', 'ant-radio-wrapper-checked');

        cy.get('.ant-form-item-label label').contains('Premium').should('be.visible');
        cy.get('[formcontrolname="isPremium"] label:nth-child(1)')
            .should('have.class', 'ant-radio-wrapper-checked');

        cy.get('.ant-form-item-label label').contains('Modified After').should('be.visible');
        cy.get(' [formcontrolname="modifiedAfter"] input[placeholder="Select date"]')
            .should('be.visible');

        cy.get('.ant-form-item-label label').contains('Modified Before').should('be.visible');
        cy.get(' [formcontrolname="modifiedBefore"] input[placeholder="Select date"]')
            .should('be.visible');
        
        cy.get('.ant-form-item-label label').contains('Sort By').should('be.visible');
        cy.get('[title="Modified Time"]').should('be.visible');

        cy.get('button.ant-btn').contains('Reset').should('be.visible');
        cy.get('[data-name="playlist-list-filter"]').click();
    });

    it('Verify playlist list Header', () => {
        cy.get('thead tr th:nth-child(1)').should('have.text', 'Status');
        cy.get('thead tr th:nth-child(2)').should('have.text', '');
        cy.get('thead tr th:nth-child(3)').should('have.text', 'Title');
        cy.get('thead tr th:nth-child(4)').should('have.text', 'Curator');
        cy.get('thead tr th:nth-child(5)').should('have.text', 'Description');
        cy.get('thead tr th:nth-child(6)').should('have.text', 'Date');
    });

    it('Verify pagination', { retries: 1}, () => {  
        cy.get('[formcontrolname="title"]').clear().type(`${constant.searchTitle}{enter}`);
        cy.wait(2000);
        
        //recrusive function
        cy.paginationNextArrow();
        cy.paginationPreviousArrow();     
    });
});
