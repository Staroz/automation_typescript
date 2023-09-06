import { ApiResponseBody } from "cypress-plugin-api"
import url from "../e2e/utils/url";

let workspaceId:string, boardId:string, listId: string;


export {}
declare global {
    namespace Cypress {
      interface Chainable {
        /**
         * Custom command to select DOM element by data-cy attribute.
         * @example createWorkspaceAPI(workspaceName: string, key: string, token: string)
         */
        createWorkspaceAPI(workspaceName: string, key: string, token: string): Cypress.Chainable<ApiResponseBody>
      }
    }
    namespace Cypress {
        interface Chainable {
          /**
           * Custom command to select DOM element by data-cy attribute.
           * @example deleteWorkspaceAPI(, key: string, token: string)
           */
          deleteWorkspaceAPI(key: string, token: string): Cypress.Chainable<ApiResponseBody>
        }
      }

      namespace Cypress {
        interface Chainable {
          /**
           * Custom command to select DOM element by data-cy attribute.
           * @example createBoardAPI(workspaceName: string, boardName: string, key: string, token: string)
           */
          createBoardAPI(workspaceName: string, boardName: string, key: string, token: string): Cypress.Chainable<ApiResponseBody>
        }
      }

      namespace Cypress {
        interface Chainable {
          /**
           * Custom command to select DOM element by data-cy attribute.
           * @example deleteBoardAPI(key: string, token: string)
           */
          deleteBoardAPI(key: string, token: string): Cypress.Chainable<ApiResponseBody>
        }
      }

      namespace Cypress {
        interface Chainable {
          /**
           * Custom command to select DOM element by data-cy attribute.
           * @example createListsAPI(key: string, token: string, listNameArray:string[])
           */
          createListsAPI(key: string, token: string, listNameArray:string[]): Cypress.Chainable<ApiResponseBody>
        }
      }

      namespace Cypress {
        interface Chainable {
          /**
           * Custom command to select DOM element by data-cy attribute.
           * @example createCardAPI(key: string, token: string, cardsNameArray:string[])
           */
          createCardAPI(key: string, token: string, cardsNameArray:string[]): Cypress.Chainable<ApiResponseBody>
        }
      }

      namespace Cypress {
        interface Chainable {
          /**
           * Custom command to select DOM element by data-cy attribute.
           * @example 'searchGoogle', (topic)
           */
          searchGoogle(topic:string): Cypress.Chainable<ApiResponseBody>
        }
      }
  }
  


Cypress.Commands.add('createWorkspaceAPI', ( workspaceName, key, token) => {
    return cy.api('POST', `${url.api}/organizations/?displayName=${workspaceName}&key=${key}&token=${token}`).
            then((response)=> {
                expect(response.status).to.eq(200);
                workspaceId = response.body.id;
                cy.wrap(workspaceId).as('workspaceId')
                })
  });

  Cypress.Commands.add('deleteWorkspaceAPI', ( key, token) => {
    return cy.api('DELETE', `${url.api}/organizations/${workspaceId}?&key=${key}&token=${token}`).
            then((response)=> {
                expect(response.status).to.eq(200);
                })
  })

  Cypress.Commands.add('createBoardAPI', ( workspaceName, boardName, key, token) => {
    cy.createWorkspaceAPI( workspaceName, key, token);
    return cy.api('POST', 
                `${url.api}/boards/?name=${boardName}&key=${key}&token=${token}`, 
                {defaultLists: false}).
                then((response)=> {
                    expect(response.status).to.eq(200);
                    boardId = response.body.id;
                    cy.wrap(boardId).as('boardId');
                    })
  });

  Cypress.Commands.add('deleteBoardAPI', ( key, token) => {
    console.log('112221', boardId);
    return cy.api('DELETE', 
                `${url.api}/boards/${boardId}?key=${key}&token=${token}`).
                then((response)=> {
                    expect(response.status).to.eq(200);

                    cy.deleteWorkspaceAPI( key, token);
                    })
  });

  Cypress.Commands.add('createListsAPI', (key, token, listNameArray ) => {

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

  Cypress.Commands.add('createCardAPI', (key, token, cardsNameArray ) => {
    for (let index = cardsNameArray.length - 1; index > -1; index--) {
        cy.api(
            'POST',
            `${url.api}/cards?name=${cardsNameArray[index]}&idList=${listId}&key=${key}&token=${token}`,
            ).then(response=>{
                    expect(response.status).to.eq(200);
                });
            }
});

Cypress.Commands.add('searchGoogle', (topic) => {
  cy.get('textarea[name="q"]').type(topic + '{enter}');
})
