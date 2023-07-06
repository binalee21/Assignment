import constant from "../fixtures/constants.json";

describe('Create Host and verify', () => {
    let HOST_DETAIL = {
        HOST_NAME: `TEST${Math.floor(Math.random()*(999-100+1)+100)}host`,
        DEVICE: [],        
        PROVIDERS: [],
        ALLOWED_COUNTRIES: [],
        STREAM_TYPE: [],
        COUNTRY_CODE: [],
        AUTH_SCHEME: [],
        URL: []        
    };
    
    it('Navigate to Create New host page and verify elements', () => {
        cy.visit('https://streams.radioedit.ihrint.com/');

        //verify logo and tool name
        cy.get('.logo').should('be.visible');

        //verify heading of the page
        cy.get('h3').should('contain.text', 'Streams');
        cy.wait(2000);
        cy.get('[routerlink="/hosts"]').click();

        //verifying heading elements
        cy.get('h3').should('contain.text', 'Hosts');
        cy.get('[routerlink="/hosts/create"]').click();      
        cy.contains('Create New Host').should('be.visible');
        cy.get('[data-name="save"]').should('be.disabled');
    });

    it('Add all the fields, save and verify', () => {
        //add HostName
        cy.verifyLabelAndEnterInputValue('Host Name', HOST_DETAIL.HOST_NAME);

        //creating alias for TerminalID input field
        cy.get('.ant-form-item')
            .contains('Terminal ID')
            .parents('nz-form-item').within(() => {
                cy.get('input').as("TerminalIdLocator")
            });

        //verify TerminalId and its value before adding Device
        cy.get('@TerminalIdLocator').should('be.disabled').and('have.value','0');
       
        //add Device
        cy.verifyAndSelectFromDropdown(HOST_DETAIL.DEVICE, " Device ");
        cy.wait(2000);       

        //verify TerminalId and its value after adding Device
        cy.get('@TerminalIdLocator').should('be.disabled').and('not.have.value','0');
       
        //add Providers, added wait to handle page refresh time
        cy.verifyAndSelectFromDropdown(HOST_DETAIL.PROVIDERS, " Providers ");
        cy.wait(4000);
       
        //add all the fields via dropdown selection
        cy.verifyAndSelectFromDropdown(HOST_DETAIL.ALLOWED_COUNTRIES, " Allowed Countries ", 2);
        cy.verifyAndSelectFromDropdown(HOST_DETAIL.STREAM_TYPE, " Stream Type ");        
        cy.verifyAndSelectFromDropdown(HOST_DETAIL.COUNTRY_CODE, " Country Code ");
        cy.verifyAndSelectFromDropdown(HOST_DETAIL.AUTH_SCHEME, " Auth Scheme ");
        cy.verifyAndSelectFromDropdown(HOST_DETAIL.URL, " Stream Base URL ");
        cy.verifyAndSelectFromDropdown(HOST_DETAIL.URL, " Talk Base URL ");

        //click on Save button
        cy.get("[data-name='save']").should("not.be.disabled").click();
    
        //verify toast message
        cy.verifyToastMessage(constant.hostAddedToastMessage);
    });

    it('Verify recently created Host in Host Management page', () => { 
        //fetching country code from captured full country name
        let TEMP = HOST_DETAIL.COUNTRY_CODE.toString().split("(");     
        let COUNTRY_SPLIT = TEMP[1].toString().split(")");

        //forming HostTitle with HostName + Device + CountryCode
        let HOST_TITLE = `${HOST_DETAIL.HOST_NAME}.${HOST_DETAIL.DEVICE.toString().toLowerCase()}.${COUNTRY_SPLIT[0].toString().toLowerCase()}`;

        //Navigate to Host Management List page
        cy.get('[routerlink="/hosts"]').click();
        cy.findElementVisibility('.ant-modal-confirm-btns > .ant-btn-primary');
        
        //search with HostTitle and verify result
        cy.get('[formcontrolname="query"]').should('be.visible').clear().type(HOST_TITLE);
        cy.wait(3000);
        cy.verifyElementWithText("tbody tr:nth-child(1)", HOST_TITLE);
        cy.verifyElementWithText("tbody tr:nth-child(1)", HOST_DETAIL.AUTH_SCHEME.toString().toUpperCase());
        cy.verifyElementWithText("tbody tr:nth-child(1)", COUNTRY_SPLIT[0].toString());
        cy.verifyElementWithText("tbody tr:nth-child(1)", HOST_DETAIL.STREAM_TYPE.toString());       
    });
});
