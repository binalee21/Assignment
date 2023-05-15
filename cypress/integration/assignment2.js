describe('Display track number from Dynamic playlist', () => {

    it('Select a Dynamic playlist and fetch the track number and display it', () => {
        //select dynamic playlist option from filter
        cy.get('button[data-name="playlist-list-filter"]').click();
        cy.get('nz-select[formcontrolname="playlistType"]').click();
        cy.get('nz-option-item[title="Dynamic"] div').click();
        cy.wait(2000);

        //Navigate to first filtered playlist
        cy.get('.clickable').eq(0).click();

        //click to open track details
        cy.get('[nztype="info-circle"]').eq(0).click();

        //fetch track number and display it
        cy.get('.ant-popover-inner-content').contains('Track ID')
            .then(($el) => {
            const trackNumber = $el.text().split('Track ID:');
            cy.log(`Track Number is -> ${trackNumber[1]}`);
            });
    });
});
