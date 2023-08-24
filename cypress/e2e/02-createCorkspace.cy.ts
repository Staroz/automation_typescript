/// <reference types="cypress" />
import { login } from "../pages/login.page";
import messages from "./utils/messages";
import url from "./utils/url";
import { workspace } from "../pages/workspace-page";

const email = Cypress.env('email');
const password = Cypress.env('pw');
const workspaceName = Cypress.env('workspaceName')

describe('Handling Workspaces in Trello', ()=>{

    before(()=>{
        // authentication in Trello
        cy.session('login Trello',()=>{
            login.page.pageLoad();
            login.loginPage(email, password);
            cy.url().should('eq', url.boards);
        });
    })

    after(()=>{
        login.page.pageLoad();
        login.logout();
        cy.url().should('eq', url.home)
    })
    describe("", () => {
        it('Create a Workspace', () => {
            workspace.page.pageBoardsLoad();
            workspace.createWorkspace(workspaceName);
            workspace.page.workspaceName().should('contain.text', workspaceName);
        });

        afterEach(()=>{
            // delete workspace with UI
            workspace.page.pageBoardsLoad();
            workspace.deleteWorkspace(workspaceName);
            workspace.page.actionAlert().should('contain.text', messages.alertMessage)
        })
    })
});