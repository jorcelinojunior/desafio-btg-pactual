
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

export const configureRoutes = (server) => {
    const apiBasePath = Config.API_BASE_PATH

    // User Start
    server.post(`${apiBasePath}/signup`, controllers.user.signUp)
    server.get(`${apiBasePath}/login`, controllers.user.login)
    server.get(`${apiBasePath}/users`, authMiddleware, controllers.user.user)

    // PersonalDocument Start
    server.post(`${apiBasePath}/document`, authMiddleware, controllers.personalDocument.createDocument)
    server.get(`${apiBasePath}/document`, authMiddleware, controllers.personalDocument.getDocument)

    // Generic Start
    server.get(`${apiBasePath}/me`, authMiddleware, controllers.generic.me)
}




