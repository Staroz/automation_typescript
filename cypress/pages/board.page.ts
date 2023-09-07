import '@4tw/cypress-drag-drop'

class BoardPage {
    page = {
        cardBtn: () => cy.get('[data-testid="trello-card"]'),
        listIcon:(value) => cy.contains('div.list.js-list-content', value),
        listBlock:(value) => cy.contains('[data-testid="list-wrapper"]', value),
        boardBtn:() => cy.get('[data-testid="view-switcher-button-text"]'),
        // Delete a workspace
        workspaceSection: (value:string) => cy.contains('.boards-page-board-section-header', value),
        // assertions        
    }

    clickCard(cardName){
        this.page.cardBtn().contains(cardName).first().click();
    }

    DragAndDrop(firstListName:string, secondListName:string) {
        this.page.boardBtn().should('be.visible')
        this.page.listIcon(firstListName).as('list1');
        this.page.listBlock(secondListName).as('list2');
        cy.get('@list1').drag('@list2');
    }
}

export const boardPage = new BoardPage;