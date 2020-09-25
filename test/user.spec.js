import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiJsonSchema from 'chai-json-schema'

import {server} from './../app/core/server'
import Config from './../config'

import { newEmail, hashBasicAuth} from './../app/utils/test'

const expect = chai.expect;

const apiBasePath = Config.API_BASE_PATH
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWY2YzI1MGY1NjYzNGEyMGU4Nzg5MWQ0IiwiaWF0IjoxNjAxMDIyNjgxLCJleHAiOjE2MDE2Mjc0ODF9.0yqqHagSzldx9KSGbKfijHBIiCAhmQiOjFsxncVooJE"

chai.use(chaiHttp)
chai.use(chaiJsonSchema)

let userSchema = {
    title: 'User Schema v1',
    type: 'object',
    required: ['user', 'token', 'name'],
    properties: {
        user: {
            type: 'object',
            minItems: 1,
            uniqueItems: true
        },
        token: {
            type: 'string'
        },
        name: {
            type: 'string',
            minimum: 3
        }
    }
}

describe('Testes de integração <User>', () => {

    it(`${apiBasePath}/signup - POST`, (done) => {
        chai.request(server)
            .post(`${apiBasePath}/signup`)
            .send({
                name: "Jorcelino Junior",
                email: newEmail,
                password: "123456"
            })
            .end((error, res) => {
                expect(error).to.be.null
                expect(res).to.be.an('object')
                expect(res).to.have.status(201)
                done()
            })
    })

    it(`${apiBasePath}/login - GET`, (done) => {

        chai.request(server)
            .get(`${apiBasePath}/login`)
            .set('Authorization', `Basic ${hashBasicAuth}`)
            .end((error, res) => {
                expect(error).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.jsonSchema({})
                done()
            })
    })

    it(`${apiBasePath}/users - GET`, (done) => {
        chai.request(server)
            .get(`${apiBasePath}/users`)
            .set("Authorization", "Bearer " + token)
            .end((error, res) => {
                expect(error).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.jsonSchema({})
                done()
            })
    })
})
