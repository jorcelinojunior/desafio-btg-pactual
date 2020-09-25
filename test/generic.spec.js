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

const meSchema = {
    "_id": "5f6c250f56634a20e87891d4",
    "name": "Jorcelino",
    "email": "01jorcelino@live.com",
    "createdAt": "2020-09-24T04:48:15.903Z",
    "updatedAt": "2020-09-24T04:48:15.903Z",
    "__v": 0,
    "id": "5f6c250f56634a20e87891d4"
}

describe('Testes de integração', () => {

    it(`${apiBasePath}/me - GET`, () => {
        chai.request(server)
            .get(`${apiBasePath}/me`)
            .set("Authorization", "Bearer " + token)
            .end((error, res) => {
                chai.expect(error).to.be.null
                chai.expect(res).to.be.jsonSchema(meSchema)
                chai.expect(res).to.have.status(200)
            })
    })
})