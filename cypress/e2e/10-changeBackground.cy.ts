/// <reference types="cypress" />

import { login } from "../pages/login.page"
import { userPage } from "../pages/user.page";
import { boardPage } from "../pages/board.page";
import { variables } from "./utils/variables";
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

describe('Change background of Board', () => {
    beforeEach(()=>{
        cy.createBoardAPI(variables.workspaceName, variables.boardName);
    })
    it('change background' , () => {
        cy.visit(url.userPage);
        userPage.clickBoard(variables.boardName);
        boardPage.DragAndDrop(variables.listNameArray[0], variables.listNameArray[2])
        boardPage.page.listIcon().eq(variables.listNameArray.indexOf( variables.listNameArray[2]))
            .should('contain', variables.listNameArray[0])
    });

    // afterEach(()=>{
    //     // delete workspace with API
    //     cy.deleteBoardAPI();
    // })
});
