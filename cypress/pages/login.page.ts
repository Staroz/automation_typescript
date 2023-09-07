/// <reference types="cypress" />

class Login {
    page = {
        pageLoad : ()=> cy.visit(''),
        homeLoginBtn : ()=>  cy.get('[data-uuid="MJFtCCgVhXrVl7v9HA7EH_login"]'),
        emailInput : ()=>  cy.get('#user'),
        continueBtn : ()=>  cy.get('#login'),
        passwordInput : ()=>  cy.get('#password'),
        loginButton : ()=>  cy.get('#login-submit'),
        //logout
        memberIconBtn: () => cy.get('[data-testid="header-member-menu-button"]'),
        logOutBtn: () => cy.get('[data-testid="account-menu-logout"]'),
        confirmLogOutBtn: () => cy.get('#logout-submit'),
        // assertion locators
        errorMessage : ()=>  cy.get('.error-message'),
        errorMessageAtlassian: ()=> cy.get('[data-testid="form-error--content"]'),
    };

    enterEmail(username:string){
        this.page.homeLoginBtn().click();
        this.page.emailInput().type(username);
        this.page.continueBtn().click();
    };

    enterPassword(password:string) {
        cy.origin('https://id.atlassian.com',{args: {password}}, ({password})=>{
            const data = Cypress.require('./login.page');
            data.login.page.passwordInput().type(password);
            data.login.page.loginButton().click();
        });
    };

    loginPage (username:string, password:string) {
        this.enterEmail(username);
        this.enterPassword(password);
    };

    enterInvalidEmail (username:string, password:string) {
        this.page.homeLoginBtn().click();
        this.page.emailInput().type(username);
        this.page.continueBtn().click();
        this.page.passwordInput().type(password);
        this.page.continueBtn().click();
    };

    logout () {
        this.page.memberIconBtn().click();
        this.page.logOutBtn().should('be.visible').click();
        cy.origin('https://id.atlassian.com', ()=>{
            const data = Cypress.require('./login.page');
            data.login.page.confirmLogOutBtn().click();
        });
        
    }
}

export const login = new Login;