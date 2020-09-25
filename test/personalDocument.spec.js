import chai from 'chai'
import chaiHttp  from 'chai-http'
import chaiJsonSchema from 'chai-json-schema'

// import user from './../app/controllers/user'
import {server} from './../app/core/server'
import Config from './../config'

import { newCPF, token } from './../app/utils/test'

const apiBasePath = Config.API_BASE_PATH 

const expect = chai.expect;

chai.use(chaiHttp)
chai.use(chaiJsonSchema)


const personalDocumentSchema = {
    title: 'Personal Document Schema v1',
    type: 'object',
    required: {'personalDocument': {}},
    properties: {
        personalDocument: {
            type: 'object',
            minItems: 0,
            uniqueItems: true
        }
    }
}

describe('Testes de integração <PersonalDocument>', () => {
    it(`${apiBasePath}/document - GET`, (done) => {
        chai.request(server)
            .get(`${apiBasePath}/document`)
            .set("Authorization", "Bearer " + token)
            .end((error, res) => {
                expect(error).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.jsonSchema(personalDocumentSchema)
                done()
            })
    })

    it(`${apiBasePath}/document - POST`, (done) => {
        chai.request(server)
            .post(`${apiBasePath}/document`)
            .set("Authorization", "Bearer " + token)
            .send({
                fullName: "Jorcelino Fernandes da Cunha Junior",
                data: new Date,
                cpf: newCPF,
                rg: "MG-12.345.678"
            })
            .end((error, res) => {
                expect(error).to.be.null
                expect(res).to.be.an('object')
                expect(res).to.have.status(201)
                done()
            })
    })
})

