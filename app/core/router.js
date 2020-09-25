import restify from 'restify'
import fs from 'fs'
import { authMiddleware } from './../utils/authMiddleware'
import Config from './../../config'

let controllers      = {}
let controllers_path = process.cwd() + '/app/controllers'

fs.readdirSync(controllers_path).forEach((file) => {
    if(file.indexOf('.js') != -1){
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
})

export const server = restify.createServer(
    {
        name    : 'desafio-btg-pactual',
        version : '1.0.0'
    }
)

server
    .use(restify.plugins.queryParser({ mapParams: false, allowDots: true }))
    .use(restify.plugins.bodyParser({ mapParams: false}))

// User Start
server.post('/api/v1/signup', controllers.user.signUp)
server.get('/api/v1/login', controllers.user.login)
server.get('/api/v1/users', authMiddleware, controllers.user.user)

// PersonalDocument Start
server.post('/api/v1/document', authMiddleware, controllers.personalDocument.createDocument)
server.get('/api/v1/document', authMiddleware, controllers.personalDocument.getDocument)

// Generic Start
server.get('/api/v1/me', authMiddleware, controllers.generic.me)

server.start = () => {
    server.listen(Config.SERVER_PORT, () => console.log(`API listening on port: ${Config.SERVER_PORT}`))
    return server
}
