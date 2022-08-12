describe('DELETE /characters/id', function(){

    //before(function(){
        //cy.back2ThePast()
        //cy.setToken()
    //})

    const character = {
        name: 'Marc Spector',
        alias: 'Cavaleiro da Lua',
        team: ['Vingadores Secretos'],
        active: true
    }
    context('quando tenho um personagem cadastrado', function(){
        before(function(){
            cy.postCharacter(character).then(function(response){
                Cypress.env('characterId', response.body.character_id)
            })
        })
        
        it('deve remover o personagem pelo id', function(){
            const id = Cypress.env('characterId')
            cy.deleteCharacterById(id).then(function(response){
                expect(response.status).to.eql(204)
            })
        })

        after(function(){
            const id = Cypress.env('characterId')
            cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eql(404)
            })
        })
    })

    it('deve retornar 404 ao remover por id não cadastrado', function(){
        const id = '62f54a8f438bc91790081106'
        cy.deleteCharacterById(id).then(function(response){
            expect(response.status).to.eql(404)
        })
    })
})