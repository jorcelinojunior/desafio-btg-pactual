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

const meSchema = {}
const expect = chai.expect;

describe('Generic:', () => {

    it(`${apiBasePath}/me - GET`, () => {
        chai.request(server)
            .get(`${apiBasePath}/me`)
            .set("Authorization", "Bearer " + token)
            .end((error, res) => {
                expect(error).to.be.null
                expect(res).to.be.jsonSchema(meSchema)
                expect(res).to.have.status(200)
            })
    })
})