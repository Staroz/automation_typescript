/// <reference types="cypress" />
import { login } from "../pages/login.page";
import { cards } from "../pages/cards.page";
import { userPage } from "../pages/user.page";
import { boardPage } from "../pages/board.page";
import { variables } from "./utils/variables";
import files from "./utils/files";
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

describe('Uploading a file in a card', () => {
    before(()=>{
        // create cards with API
        cy.createBoardAPI( variables.workspaceName, variables.boardName, variables.key, variables.token);
        cy.createListsAPI(variables.key, variables.token, variables.listNameArray);
        cy.createCardAPI(variables.key, variables.token, variables.cardsNameArray)
    })
    it('Upload a image', () => {
        cy.visit(url.userPage);
        userPage.clickBoard(variables.boardName);
        boardPage.clickCard(variables.cardsNameArray[0])
        cards.uploadFile( files.photo);
        cards.page.attachmentNameLink().should('contain.text', files.photoName)
    });
    afterEach(()=>{
        // delete workspace with API
        cy.deleteBoardAPI(variables.key,variables.token)
    })
})
