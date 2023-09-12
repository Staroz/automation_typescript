/// <reference types="cypress" />
import { login } from "../pages/login.page";
import messages from "./utils/messages";
import url from "./utils/url";
import { variables } from "./utils/variables";

describe('Testing Logging in Trello', ()=>{
    it('logging in Trello with a username and password valid ', () => {
        login.page.pageLoad();
        login.loginPage(variables.email, variables.password);
        cy.url().should('contain', url.userPage);
    });

    it('logging in Trello with a username invalid ', () => {
        login.page.pageLoad();
        login.enterInvalidEmail(variables.invalidEmail, variables.invalidPw);
        login.page.errorMessage().should('contain', messages.errorMessageLogin);
    });

    it('Logging in Trello with a username valid and password invalid', () => {
        login.page.pageLoad();
        login.enterEmail(variables.email)
        login.enterPassword(variables.invalidPw);
        cy.origin('https://id.atlassian.com',{ args: { messages } }, ({ messages })=>{
            const data = Cypress.require('../pages/login.page');
            data.login.page.errorMessageAtlassian().should('contain', messages.errorMessageLogin)
        });
    });
});