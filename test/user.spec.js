import chai from 'chai'
import chaiHttp  from 'chai-http'
import subSet from 'chai-subset'

// import user from '../app/controllers/user'
import {server} from './../app/core/server'
import Config from './../config'

const apiBasePath = Config.API_BASE_PATH 

chai.use(chaiHttp)
chai.use(subSet)

const userSchema = {
    'user': {
        '_id': '',
        'name': '',
        'email': '',
        'createdAt': '',
        'updatedAt': '',
        '__v': 0,
        'id': ''
    },
    'token': ''
}

describe('Testes de integração', () => {

    it(`${apiBasePath}/signup - POST`, () => {
        chai.request(server)
            .post(`${apiBasePath}/signup`)
            .send({
                name: "jorcelino Junior",
                email: "jorcelino@live.com",
                password: 123456
            })
            .end((error, res) => {
                chai.expect(error).to.be.null
                chai.expect(error).to.be.an('object')
                chai.expect(res).to.have.status(201)
                chai.expect(res.body).to.containSubset(userSchema)
            })
    })
})

