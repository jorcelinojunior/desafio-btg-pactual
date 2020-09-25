
import fs from 'fs'
import { authMiddleware } from './../utils/authMiddleware'

let controllers      = {}
let controllers_path = process.cwd() + '/app/controllers'

fs.readdirSync(controllers_path).forEach((file) => {
    if(file.indexOf('.js') != -1){
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
})

export const configureRoutes = (app) => {
    const apiBasePath = '/api/v1'

    // User Start
    app.post(`${apiBasePath}/signup`, controllers.user.signUp)
    app.get(`${apiBasePath}/login`, controllers.user.login)
    app.get(`${apiBasePath}/users`, authMiddleware, controllers.user.user)

    // PersonalDocument Start
    app.post(`${apiBasePath}/document`, authMiddleware, controllers.personalDocument.createDocument)
    app.get(`${apiBasePath}/document`, authMiddleware, controllers.personalDocument.getDocument)

    // Generic Start
    app.get(`${apiBasePath}/me`, authMiddleware, controllers.generic.me)
}




