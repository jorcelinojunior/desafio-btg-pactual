import restify from 'restify'
import {configureRoutes} from './router'
import Config from '../../config'

export const server = restify.createServer(
    {
        name    : 'desafio-btg-pactual',
        version : '1.0.0'
    }
)
server
    .use(restify.plugins.queryParser({ mapParams: false, allowDots: true }))
    .use(restify.plugins.bodyParser({ mapParams: false}))

configureRoutes(server)

server.start = () => {
    server.listen(Config.SERVER_PORT, () => console.log(`API listening on port: ${Config.SERVER_PORT}`))
    return server
}