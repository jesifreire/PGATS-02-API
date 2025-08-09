const request = require('supertest')
const sinon = require('sinon')
const {expect} = require('chai')

const app = require('../../app')

describe('Transfer controller',()=>{
    describe('POST/transfer',()=>{
        it('Quando informo remetente e destinatario inexistentes recebo 400', async() => {
            const resposta = await request(app)                                                                                                             
            .post('/transfer')
            .send({
                from: "jesi",
                to: "toddy",
                amount: 10
            })
            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.have.property('error','Usuário não encontrado')
            
        })
    })

})