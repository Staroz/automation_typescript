/// <reference types="cypress" />
import { login } from "../pages/login.page";
import { workspace } from "../pages/workspace.page";
import { userPage } from "../pages/user.page";
import { variables } from "./utils/variables";
import messages from "./utils/messages";
import url from "./utils/url";


before(()=>{
    // authentication in Trello
    cy.session('login Trello',()=>{
        login.page.pageLoad();
        login.loginPage(variables.email, variables.password);
        cy.url().should('eq', url.userPage);
    });
})

after(()=>{
    login.page.pageLoad();
    login.logout();
    cy.url().should('eq', url.home)
})

describe('Handling Workspaces in Trello', () => {
    it('Create a Workspace', () => {
        cy.visit(url.userPage)
        userPage.addWorkspace();
        workspace.createWorkspace(variables.workspaceName);
        workspace.page.workspaceName().should('contain.text', variables.workspaceName);
    });

    afterEach(()=>{
        // delete workspace with UI
        cy.visit(url.userPage)
        userPage.clickSettingWorkspace(variables.workspaceName);
        workspace.deleteWorkspace(variables.workspaceName);
        workspace.page.actionAlert().should('contain.text', messages.alertMessage)
    })
})
