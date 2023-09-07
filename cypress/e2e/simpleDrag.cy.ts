/// <reference types="cypress" />
import { login } from "../pages/login.page";
import files from "./utils/files";
import url from "./utils/url";
import { cards } from "../pages/cards-page";
const key = Cypress.env('key');
const token = Cypress.env('token');
const email = Cypress.env('email');
const password = Cypress.env('pw');
const workspaceName = Cypress.env('workspaceName');
const boardName = Cypress.env('workspaceName');
const listNameArray = Cypress.env('listNameArray');
const cardsNameArray = Cypress.env('cardsNameArray');
import '@4tw/cypress-drag-drop'



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

describe('Uploading a file in a card', ()=>{ 
    before(()=>{
        // create cards with API
        cy.createBoardAPI( workspaceName, boardName, key, token);
        cy.createListsAPI(key, token, listNameArray);
        cy.createCardAPI(key, token, cardsNameArray)
    })
    it('Create a Workspace', () => {
        cy.visit(url.boards);
        cards.page.boardBtn().contains(boardName).first().click();
    cy.get('.u-fancy-scrollbar.js-no-higher-edits.js-list-sortable.ui-sortable')
        .contains('.list.js-list-content', listNameArray[1]).as('element');
    cy.get('.list-card-details.js-card-details').contains(cardsNameArray[1]).drag('@element');
    });

    afterEach(()=>{
        // delete workspace with API
        cy.deleteBoardAPI(key,token)
    })
})