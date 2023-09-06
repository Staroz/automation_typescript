/// <reference types="cypress" />

const baseUrl = "https://www.google.com/";
const searchTopic = 'pokemon';

it('Search in Google', () => {

    cy.visit(baseUrl);
    cy.searchGoogle(searchTopic);
    // cy.url().should('contain', searchTopic)
    // const searchTopicUpperCase = searchTopic.replace(/[a-z]/, searchTopic[0].toUpperCase())
    cy.get('h3.LC20lb').first().then(value=>{
        const text= value.text().toLowerCase()
        expect(text).contain(searchTopic.toLowerCase())
    })
});