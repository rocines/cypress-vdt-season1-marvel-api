
describe('POST /characters', function(){

    before(function(){
        cy.request({
            method: 'POST',
            url: '/sessions',
            body: {
                email: 'rocines_neto@outlook.com',
                password: '12345678'
            }
        }).then(function(response){
            expect(response.status).to.eql(200)
            cy.log(response.body.token)
            Cypress.env('token', response.body.token)
        })
    })

    it('deve cadastrar um personagem', function(){
        const character = {
            name: 'Scott Lang',
            alias: 'Homem-Formiga',
            team: ['Vingadores'],
            active: true
        }
        cy.request({
            method: 'POST',
            url: '/characters',
            body: character,
            headers: {
                Authorization: Cypress.env('token')
            }
        }).then(function(response){
            expect(response.status).to.eql(201)
        })
    })
})