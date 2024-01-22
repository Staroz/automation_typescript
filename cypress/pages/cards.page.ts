/// <reference types="cypress" />

class Cards {
    page = {
        attachmentBtn: () => cy.get('button').contains('Attachment'),
        chooseFileBtn: () => cy.get('.D5LRBFV5A6xwhp'),
        // assertion locators
        attachmentNameLink: () => cy.get('.attachment-thumbnail-name', {timeout: 6000}),
    };

    uploadFile ( file:string){
        this.page.attachmentBtn().should('be.visible');
        this.page.attachmentBtn().click();
        this.page.chooseFileBtn().selectFile(file);
        this.page.attachmentNameLink().should('be.visible');
    };
}

export const cards = new Cards;