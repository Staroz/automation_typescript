/// <reference types="cypress" />

import url from "../e2e/utils/url";

class Workspace {
    page = {
        pageBoardsLoad : ()=> cy.visit(url.boards),
        createBtn: () => cy.get('[data-testid="header-create-menu-button"]'),
        createWorkspaceBtn: () => cy.get('[data-testid="header-create-team-button"]'),
        workspaceNameInput: () => cy.get('[data-testid="header-create-team-name-input"]'),
        workspaceTypeSelect: () => cy.get('.css-191o3mb'),
        workspaceType: () => cy.get('[data-testid="header-create-team-type-input-education"]').contains('Education'),
        workspaceContinueBtn: () => cy.get('[data-testid="header-create-team-submit-button"]'),
        workspaceShowLaterBtn: () => cy.get('[data-testid="show-later-button"]'),
        // Delete a workspace
        workspaceSection: (value:string) => cy.contains('.boards-page-board-section-header', value),
        deleteWorkspaceBtn: () => cy.get('[data-testid="delete-workspace-button"]'),
        confirmWorkspaceNameInput: () => cy.get('#confirmWorkspaceName'),
        confirmDeleteWorkspaceBtn: () => cy.get('[data-testid="delete-workspace-confirm-button"]'),
        // assertion locators
        workspaceName: () => cy.get('.SiP6d2d_8FAAkC'),
        actionAlert: () => cy.get('.YEctMXs9uZbttS'),

    };

    createWorkspace (workspaceName:string){
        this.page.pageBoardsLoad();
        this.page.createBtn().click();
        this.page.createWorkspaceBtn().click();
        this.page.workspaceNameInput().type(workspaceName);
        this.page.workspaceTypeSelect().click();
        this.page.workspaceType().click();
        this.page.workspaceContinueBtn().click();
        this.page.workspaceShowLaterBtn().click();
    };

    deleteWorkspace (workspaceName:string) {
        this.page.pageBoardsLoad();
        this.page.workspaceSection(workspaceName).first().find('a').contains('Settings').click();
        this.page.deleteWorkspaceBtn().click();
        this.page.confirmWorkspaceNameInput().type(workspaceName);
        this.page.confirmDeleteWorkspaceBtn().click();
    }
}

export const workspace = new Workspace;