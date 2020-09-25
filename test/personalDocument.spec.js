import chai from 'chai'
import chaiHttp  from 'chai-http'
import chaiJsonSchema from 'chai-json-schema'

// import user from './../app/controllers/user'
import {server} from './../app/core/server'
import Config from './../config'

const apiBasePath = Config.API_BASE_PATH 
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWY2YzI1MGY1NjYzNGEyMGU4Nzg5MWQ0IiwiaWF0IjoxNjAxMDIyNjgxLCJleHAiOjE2MDE2Mjc0ODF9.0yqqHagSzldx9KSGbKfijHBIiCAhmQiOjFsxncVooJE"

chai.use(chaiHttp)
chai.use(chaiJsonSchema)

const personalDocumentSchema = {
    title: 'Personal Document Schema v1',
    type: 'object',
    required: ['personalDocument'],
    properties: {
        personalDocument: {
            type: 'array',
            minItems: 0,
            uniqueItems: true
        }
    }
}

describe('PersonalDocument:', () => {

    it(`${apiBasePath}/document - GET`, () => {
        chai.request(server)
            .get(`${apiBasePath}/document`)
            .set("Authorization", "Bearer " + token)
            .end((error, res) => {
                chai.expect(error).to.be.null
                chai.expect(res).to.have.status(200)
                chai.expect(res).to.be.jsonSchema(personalDocumentSchema)
            })
    })

    it(`${apiBasePath}/document - POST`, () => {
        chai.request(server)
            .post(`${apiBasePath}/document`)
            .set("Authorization", "Bearer " + token)
            .send({
                fullName: "Jorcelino Fernandes da Cunha Junior",
                data: new Date,
                cpf: "927.630.000-70",
                rg: "MG-12.345.678"
            })
            .end((error, res) => {
                chai.expect(error).to.be.null
                chai.expect(res).to.be.an('object')
                chai.expect(res).to.have.status(201)
                chai.expect(res.body).to.containSubset(personalDocumentSchema)
            })
    })
})

