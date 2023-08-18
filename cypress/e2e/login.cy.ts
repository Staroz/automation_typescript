/// <reference types="cypress" />
import { login } from "../pages/login.page";

describe('Testing Logging in Trello', ()=>{
    it('logging in Trello with a username and password valid ', () => {
        login.page.pageLoad();
        login.loginPage(Cypress.env('email'),Cypress.env('pw'));
        cy.url().should('contain', Cypress.env('userName'));
    });

    it('logging in Trello with a username invalid ', () => {
        login.page.pageLoad();
        login.enterInvalidEmail(Cypress.env('invalidEmail'), Cypress.env('invalidPw'),);
        login.page.errorMessage().should('contain', Cypress.env('errorMessage'));
    });

    it('Logging in Trello with a username valid and password invalid', () => {
        login.page.pageLoad();
        login.enterEmail(Cypress.env('email'))
        login.enterPassword(Cypress.env('invalidPw'));
        cy.origin('https://id.atlassian.com',()=>{
            const data = Cypress.require('../pages/login.page');
            data.login.page.errorMessageAtlassian().should('contain', Cypress.env('errorMessage'))
        });
    });
});