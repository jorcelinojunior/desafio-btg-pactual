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

    it(`${apiBasePath}/signup - POST`, () => {
        chai.request(server)
            .post(`${apiBasePath}/signup`)
            .send({
                name: "Jorcelino Junior",
                email: "jorcelino@live.com",
                password: "123456"
            })
            .end((error, res) => {
                chai.expect(error).to.be.null
                chai.expect(error).to.be.an('object')
                chai.expect(res).to.have.status(201)
            })
    })

    // it(`${apiBasePath}/login - GET`, () => {})


    // it(`${apiBasePath}/users - GET`, () => {})
})

