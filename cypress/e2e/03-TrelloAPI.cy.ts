/// <reference types="cypress" />
import { variables } from "./utils/variables";

describe('handling API of Trello', () => {
    describe('Workspaces', ()=> {
        it('Create  and delete a workspace', () => {
            cy.createWorkspaceAPI(variables.workspaceName)
        });

        afterEach(()=>{
            cy.deleteWorkspaceAPI()
        });
    })

    describe('Boards', ()=> {
        it('Create  and delete a Board', () => {
            cy.createBoardAPI(variables.workspaceName, variables.boardName)
        });

        afterEach(()=>{
            cy.deleteBoardAPI()
        });
    });

    
    describe('Lists', ()=> {
        it('Create  and delete a Lists', () => {
            cy.createBoardAPI(variables.workspaceName, variables.boardName);
            cy.createListsAPI(variables.listNameArray);
        });

        afterEach(()=>{
            cy.deleteBoardAPI();
        });
    });

    describe('Cards', ()=> {
        it('Create  and delete Cards', () => {
            cy.createBoardAPI( variables.workspaceName, variables.boardName);
            cy.createListsAPI(variables.listNameArray);
            cy.createCardAPI(variables.cardsNameArray)
        });

        afterEach(()=>{
            cy.deleteBoardAPI()
        });
    });
});
