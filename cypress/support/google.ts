
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
          
        }
      }
    }

    Cypress.