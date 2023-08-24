/// <reference types="cypress" />

const key = Cypress.env('key');
const token = Cypress.env('token');
const workspaceName = Cypress.env('workspaceName');
const boardName = Cypress.env('workspaceName');
const listNameArray = Cypress.env('listNameArray');
const cardsNameArray = Cypress.env('cardsNameArray');


describe('handling API of Trello', () => {
    describe('Workspaces', ()=> {
        it('Create  and delete a workspace', () => {
            cy.createWorkspaceAPI( workspaceName, key, token)
        });

        afterEach(()=>{
            cy.deleteWorkspaceAPI(key,token)
        });
    })

    describe('Boards', ()=> {
        it('Create  and delete a Board', () => {
            cy.createBoardAPI( workspaceName, boardName, key, token)
        });

        afterEach(()=>{
            cy.deleteBoardAPI(key,token)
        });
    });

    
    describe('Lists', ()=> {
        it('Create  and delete a Lists', () => {
            cy.createBoardAPI( workspaceName, boardName, key, token)
            cy.createListsAPI(key, token, listNameArray)
        });

        afterEach(()=>{
            cy.deleteBoardAPI(key,token)
        });
    });

    describe('Cards', ()=> {
        it('Create  and delete Cards', () => {
            cy.createBoardAPI( workspaceName, boardName, key, token);
            cy.createListsAPI(key, token, listNameArray);
            cy.createCardAPI(key, token, cardsNameArray)
        });

        afterEach(()=>{
            cy.deleteBoardAPI(key,token)
        });
    });
});
