import { ApiResponseBody } from "cypress-plugin-api"
import url from "../e2e/utils/url";
import { variables } from "../e2e/utils/variables";

let workspaceId:string, boardId:string, listId: string;
const key = variables.key;
const token = variables.token;


export {}
declare global {
    namespace Cypress {
      interface Chainable {
        /**
         * Custom command to select DOM element by data-cy attribute.
         * @example createWorkspaceAPI(workspaceName: string)
         */
        createWorkspaceAPI(workspaceName: string): Cypress.Chainable<ApiResponseBody>
      }
    }
    namespace Cypress {
        interface Chainable {
          /**
           * Custom command to select DOM element by data-cy attribute.
           * @example deleteWorkspaceAPI()
           */
          deleteWorkspaceAPI(): Cypress.Chainable<ApiResponseBody>
        }
      }

      namespace Cypress {
        interface Chainable {
          /**
           * Custom command to select DOM element by data-cy attribute.
           * @example createBoardAPI(workspaceName: string, boardName: string)
           */
          createBoardAPI(workspaceName: string, boardName: string): Cypress.Chainable<ApiResponseBody>
        }
      }

      namespace Cypress {
        interface Chainable {
          /**
           * Custom command to select DOM element by data-cy attribute.
           * @example deleteBoardAP)
           */
          deleteBoardAPI(): Cypress.Chainable<ApiResponseBody>
        }
      }

      namespace Cypress {
        interface Chainable {
          /**
           * Custom command to select DOM element by data-cy attribute.
           * @example createListsAP, listNameArray:string[])
           */
          createListsAPI(listNameArray:string[]): Cypress.Chainable<ApiResponseBody>
        }
      }

      namespace Cypress {
        interface Chainable {
          /**
           * Custom command to select DOM element by data-cy attribute.
           * @example createCardAP, cardsNameArray:string[])
           */
          createCardAPI (cardsNameArray:string[]): Cypress.Chainable<ApiResponseBody>
        }
      }
  }

Cypress.Commands.add('createWorkspaceAPI', ( workspaceName) => {
    return cy.api('POST', `${url.api}/organizations/?displayName=${workspaceName}&key=${key}&token=${token}`).
            then((response)=> {
                expect(response.status).to.eq(200);
                workspaceId = response.body.id;
                cy.wrap(workspaceId).as('workspaceId')
                })
  });

  Cypress.Commands.add('deleteWorkspaceAPI', () => {
    return cy.api('DELETE', `${url.api}/organizations/${workspaceId}?&key=${key}&token=${token}`).
            then((response)=> {
                expect(response.status).to.eq(200);
                })
  })

  Cypress.Commands.add('createBoardAPI', ( workspaceName, boardName, ) => {
    cy.createWorkspaceAPI( workspaceName, );
    return cy.api('POST', 
                `${url.api}/boards/?name=${boardName}&key=${key}&token=${token}`, 
                {defaultLists: false}).
                then((response)=> {
                    expect(response.status).to.eq(200);
                    boardId = response.body.id;
                    cy.wrap(boardId).as('boardId');
                    })
  });

  Cypress.Commands.add('deleteBoardAPI', ( ) => {
    console.log('112221', boardId);
    return cy.api('DELETE', 
                `${url.api}/boards/${boardId}?key=${key}&token=${token}`).
                then((response)=> {
                    expect(response.status).to.eq(200);
                    cy.deleteWorkspaceAPI( );
                    })
  });

  Cypress.Commands.add('createListsAPI', ( listNameArray ) => {
    for (let index = listNameArray.length - 1; index > -1; index--) {
      cy.api(
            'POST',
            `${url.api}/lists?name=${listNameArray[index]}&idBoard=${boardId}&key=${key}&token=${token}`
            ).then(response=>{
                    expect(response.status).to.eq(200);
                    listId = response.body.id;
                    cy.wrap(listId).as(listId);
                });
            }
  });

  Cypress.Commands.add('createCardAPI', ( cardsNameArray ) => {
    for (let index = cardsNameArray.length - 1; index > -1; index--) {
        cy.api(
            'POST',
            `${url.api}/cards?name=${cardsNameArray[index]}&idList=${listId}&key=${key}&token=${token}`,
            ).then(response=>{
                    expect(response.status).to.eq(200);
                });
            }
});


