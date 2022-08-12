
describe('POST /characters', function(){

    //before(function(){
        //cy.back2ThePast()
    //    cy.setToken()
    //})

    it('deve cadastrar um personagem', function(){
        const character = {
            name: 'Scott Lang',
            alias: 'Homem-Formiga',
            team: ['Vingadores'],
            active: true
        }
        cy.postCharacter(character)
            .then(function(response){
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)
        })
    })

    context('quando o personagem já existe', function(){

        const character = {
            name: 'Wade Wilson',
            alias: 'Deadpool',
            team: ['thunderbolts'],
            active: true
        }

        before(function(){
            cy.postCharacter(character)
                .then(function(response){
                    expect(response.status).to.eql(201)
            })
        })

        it('não deve cadastrar duplicado', function(){
            cy.postCharacter(character)
                .then(function(response){
                    expect(response.status).to.eql(400)
            })
        })
    })
})

