
describe('GET /characters',function(){

    const characters = [
        {
            name: 'Scott Lang',
            alias: 'Homem-Formiga',
            team: ['Vingadores'],
            active: true
        },
        {
            name: 'Scott Summers',
            alias: 'Ciclope',
            team: ['X-Men', 'X-Force'],
            active: true
        },
        {
            name: 'Peter Parker',
            alias: 'Homem-Aranha',
            team: ['Vingadores', 'Novos Vingadores'],
            active: true
        }
    ]

    before(function(){
        //cy.back2ThePast()
        //cy.setToken()
        cy.populateCharacters(characters)
    })

    it('deve retornar uma lista de personagens', function(){
        cy.getCharacters()
            .then(function(response){
                expect(response.status).to.eql(200)
                expect(response.body).to.be.a('array')
                //expect(response.body.length).to.eql(2)
                expect(response.body.length).greaterThan(0)
            })
    })

    it('deve buscar personagem por nome', function(){
        cy.searchCharacters('Peter').then(function(response){
            expect(response.status).to.eql(200)
            expect(response.body.length).to.eql(1)
            expect(response.body[0].alias).to.eql('Homem-Aranha')
            expect(response.body[0].team).to.eql(['Vingadores', 'Novos Vingadores'])
            expect(response.body[0].active).to.eql(true)
        })
    })
})

describe('GET /characters/id', function(){

    const character = {
        name: 'Thor Odinson',
        alias: 'Thor',
        team: ['Vingadores'],
        active: true
    }
    context('quando tenho um personagem cadastrado', function(){
        before(function(){
            //cy.back2ThePast()
            cy.setToken()
            cy.postCharacter(character).then(function(response){
                Cypress.env('characterId', response.body.character_id)
            })
        })
        
        it('deve buscar o personagem pelo id', function(){
            const id = Cypress.env('characterId')
            cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eql(200)
                expect(response.body.alias).to.eql('Thor')
                expect(response.body.team).to.eql(['Vingadores'])
                expect(response.body.active).to.eql(true)
            })
        })

        it('deve ser obrigatório o preenchimento dos campos, com exceção da idade', function(){
            const id = Cypress.env('characterId')
            cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eql(200)
                expect(response.body.name).to.not.be.null
                expect(response.body.team).to.not.be.null
                expect(response.body.alias).to.not.be.null
                expect(response.body.active).to.not.be.null
    
            })
        })
    })

    it('deve retornar 404 ao buscar por id não cadastrado', function(){
        const id = '62f54a8f438bc91790081106'
        cy.getCharacterById(id).then(function(response){
            expect(response.status).to.eql(404)
        })
    })

})


