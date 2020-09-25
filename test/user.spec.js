import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiJsonSchema from 'chai-json-schema'

// import user from './../app/controllers/user'
import {server} from './../app/core/server'
import Config from './../config'

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


describe('User:', () => {

    it(`${apiBasePath}/signup - POST`, async () => {
        return chai.request(server)
            .post(`${apiBasePath}/signup`)
            .send({
                name: "Jorcelino Junior",
                email: `${parseInt(Math.random() * 1000).toString()}jorcelino@live.com`,
                password: "123456"
            })
            .end((error, res) => {
                chai.expect(error).to.be.null
                chai.expect(res).to.be.an('object')
                chai.expect(res).to.have.status(201)
                chai.expect(res).to.be.jsonSchema(userSchema)
            })
    })

    it(`${apiBasePath}/login - GET`, async () => {
        return chai.request(server)
            .get(`${apiBasePath}/login`)
            .set('Authorization', 'Basic 01jorcelino@live.com:123456')
            .end((error, res) => {
                chai.expect(error).to.be.null
                chai.expect(res).to.have.status(200)
                chai.expect(res).to.be.jsonSchema(userSchema)
            })
    })

    it(`${apiBasePath}/users - GET`, () => {
        return chai.request(server)
            .get(`${apiBasePath}/users`)
            .set("Authorization", "Bearer " + token)
            .end((error, res) => {
                chai.expect(error).to.be.null
                chai.expect(res).to.have.status(200)
                chai.expect(res).to.be.jsonSchema(userSchema)
            })
    })
})
