import chai from 'chai'
import chaiHttp  from 'chai-http'
import subSet from 'chai-subset'

// import user from './../app/controllers/user'
import {server} from './../app/core/server'
import Config from './../config'

const apiBasePath = Config.API_BASE_PATH 

chai.use(chaiHttp)
chai.use(subSet)

describe('Testes de integração', () => {

    // it(`${apiBasePath}/document - GET`, () => {

    // })

    // it(`${apiBasePath}/document - POST`, () => {
    //     chai.request(server)
    //         .post(`${apiBasePath}/document`)
    //         .send({
    //             fullName: "Jorcelino Fernandes da Cunha Junior",
    //             data: new Date,
    //             cpf: "123456",
    //             rg: "MG-12.345.678"
    //         })
    //         .end((error, res) => {
    //             chai.expect(error).to.be.null
    //             chai.expect(error).to.be.an('object')
    //             chai.expect(res).to.have.status(201)
    //             chai.expect(res.body).to.containSubset(userSchema)
    //         })
    // })
})

