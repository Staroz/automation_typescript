export const variables = {
    "email": Cypress.env('email'),
    "password": Cypress.env('pw'),
    "userName": Cypress.env('userName'),
    "workspaceName": "Trello",
    "invalidEmail": "example@email.com",
    "invalidPw": "Testing178657",
    "boardName": "Trello 01",
    "listNameArray": ["Backlog", "In Progress", "Done"],
    "cardsNameArray": ["Card 3", "Card 2", "Card 1"],
    "token": Cypress.env('token'), 
    "key": Cypress.env('key')
}