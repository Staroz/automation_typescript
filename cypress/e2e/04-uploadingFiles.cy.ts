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

describe('Uploading a file in a card', ()=>{

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
    describe("Upload", () => {
        before(()=>{
            // create cards with API
            cy.createBoardAPI( workspaceName, boardName, key, token);
            cy.createListsAPI(key, token, listNameArray);
            cy.createCardAPI(key, token, cardsNameArray)
        })
        it('Create a Workspace', () => {
            cards.uploadFile(boardName, cardsNameArray[0], files.photo);
            cards.page.attachmentNameLink().should('contain.text', files.photoName)
        });

        afterEach(()=>{
            // delete workspace with API
            cy.deleteBoardAPI(key,token)
        })
    })
});