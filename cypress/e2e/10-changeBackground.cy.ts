/// <reference types="cypress" />

import { login } from "../pages/login.page"
import { userPage } from "../pages/user.page";
import { boardPage } from "../pages/board.page";
import { variables } from "./utils/variables";
import url from "./utils/url";
import files from "./utils/files";

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

describe('Change background of Board', () => {
    beforeEach(()=>{
        cy.createBoardAPI(variables.workspaceName, variables.boardName);
    })
    it('change background' , () => {
        cy.visit(url.userPage);
        userPage.clickBoard(variables.boardName);
        boardPage.changeBackground(files.background);
        boardPage.page.backgroundIcon().eq(1).should('have.attr', 'style').and('include', files.backgroundName)
    });

    afterEach(()=>{
        // delete workspace with API
        cy.deleteBoardAPI();
    })
});
