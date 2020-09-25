import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

export default {
    SERVER_PORT      : process.env.SERVER_PORT || "3000",

    DB_HOST          : process.env.DB_HOST || "ds019254.mlab.com",
    DB_PORT          : Number.parseInt(process.env.DB_PORT || "19254"),
    DB_NAME          : process.env.DB_NAME || "desafio_btg_pactual",
    DB_USER          : process.env.DB_USER || "jorcelino",
    DB_PASS          : process.env.DB_PASS || "2.Strong.Coffees.Please",

    SECRET_KEY       : '86D5qDFdZjra8kA6Xybq3xCy8ZKCzxMq',
    TOKEN_EXPIRATION : Number.parseInt(process.env.TOKEN_EXPIRATION || '86400'),

    DIR_NAME_FILES   : process.env.DIR_NAME_FILES || path.resolve("./")+"/app/documents"

}