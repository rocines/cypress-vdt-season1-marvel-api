// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Obter Token
Cypress.Commands.add('setToken', function(){
    cy.api({
        method: 'POST',
        url: '/sessions',
        body: {
            email: 'rocines_neto@outlook.com',
            password: '12345678'
        },
        failOnStatusCode: false
    }).then(function(response){
        expect(response.status).to.eql(200)
        Cypress.env('token', response.body.token)
    })
})

//Limpar Cadastros
Cypress.Commands.add('back2ThePast', function(){
    cy.api({
        method: 'DELETE',
        url: 'back2thepast/62960993ad558b00165b5437',
        failOnStatusCode: false
    }).then(function(response){
        expect(response.status).to.eql(200)
    })
})

//Post de personagens
Cypress.Commands.add('postCharacter', function(payload){
    cy.api({
        method: 'POST',
        url: '/characters',
        body: payload,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function(response){
        return response
    })
})

//Get de personagens
Cypress.Commands.add('getCharacters', function(){
    cy.api({
        method: 'GET',
        url: '/characters',
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function(response){
        return response
    })
})

//Get de um personagem por Id
Cypress.Commands.add('getCharacterById', function(characterId){
    cy.api({
        method: 'GET',
        url: '/characters/' + characterId,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function(response){
        return response
    })
})

//Get de um personagem
Cypress.Commands.add('searchCharacters', function(characterName){
    cy.api({
        method: 'GET',
        url: '/characters',
        qs: {name: characterName},
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function(response){
        return response
    })
})

//Popular personagens
Cypress.Commands.add('populateCharacters', function(characters){
    characters.forEach(function(c){
        cy.postCharacter(c)
    })
})

//Delete de um personagem por Id
//Get de um personagem por Id
Cypress.Commands.add('deleteCharacterById', function(characterId){
    cy.api({
        method: 'DELETE',
        url: '/characters/' + characterId,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function(response){
        return response
    })
})