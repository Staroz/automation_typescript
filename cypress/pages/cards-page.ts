/// <reference types="cypress" />

import url from "../e2e/utils/url";

class Cards {
    page = {
        pageBoardsLoad : ()=> cy.visit(url.boards),
        boardBtn: () => cy.get('.board-tile'),
        cardBtn: () => cy.get('[data-testid="trello-card"]'),
        attachmentBtn: () => cy.get('button').contains('Attachment'),
        chooseFileBtn: () => cy.get('.D5LRBFV5A6xwhp'),
        // assertion locators
        attachmentNameLink: () => cy.get('.attachment-thumbnail-name', {timeout: 6000}),
    };

    uploadFile (boardName:string, cardName:string, file:string){
        this.page.pageBoardsLoad();
        this.page.boardBtn().contains(boardName).first().click();
        this.page.cardBtn().contains(cardName).first().click();
        this.page.attachmentBtn().should('be.visible');
        this.page.attachmentBtn().click();
        this.page.chooseFileBtn().selectFile(file);
        this.page.attachmentNameLink().should('be.visible');
    };
}

export const cards = new Cards;