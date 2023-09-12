import url from "../e2e/utils/url";

class UserPage {
    page = {
        pageBoardsLoad : ()=> cy.visit(url.userPage),
        boardBtn: () => cy.get('.board-tile'),
        createBtn: () => cy.get('[data-testid="header-create-menu-button"]'),
        createWorkspaceBtn: () => cy.get('[data-testid="header-create-team-button"]'),
        // Delete a workspace
        workspaceSection: (value:string) => cy.contains('.boards-page-board-section-header', value),
        // assertions
        actionAlert: () => cy.get('.YEctMXs9uZbttS'),
    }

    clickBoard(boardName:string) {
        this.page.boardBtn().contains(boardName).first().click();
    }

    addWorkspace() {
        this.page.createBtn().click();
        this.page.createWorkspaceBtn().click();
    }

    clickSettingWorkspace(workspaceName:string) {
        this.page.workspaceSection(workspaceName).first().find('a').contains('Settings').click();
    }
}

export const userPage = new UserPage;


