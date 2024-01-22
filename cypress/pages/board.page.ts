import '@4tw/cypress-drag-drop'

class BoardPage {
    page = {
        cardBtn: () => cy.get('[data-testid="trello-card"]'),
        listIcon:() => cy.get('div.list.js-list-content'),
        listDroppable:(value:string) => cy.get('div#board.u-fancy-scrollbar.js-no-higher-edits.js-list-sortable.ui-sortable')
                                            .contains('.list.js-list-content', value),
        boardBtn:() => cy.get('[data-testid="view-switcher-button-text"]'),
        // Delete a workspace
        workspaceSection: (value:string) => cy.contains('.boards-page-board-section-header', value),
        // assertions        
    }

    clickCard(cardName:string){
        this.page.cardBtn().contains(cardName).first().click();
    }

    DragAndDrop(firstListName:string, secondListName:string) {
        this.page.boardBtn().should('be.visible');
        this.page.listIcon().and('contain.text', firstListName).as('draggable');
        this.page.listDroppable(secondListName).as('droppable');
        cy.get('@draggable').drag('@droppable', {target: {x:200, y:50}});
    }
}

export const boardPage = new BoardPage;