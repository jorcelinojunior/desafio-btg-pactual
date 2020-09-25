import jwt from 'jsonwebtoken'
import Config from './../../config'

const secret = Config.SECRET_KEY

export const sign   = payload => jwt.sign(payload, secret, {expiresIn : Config.TOKEN_EXPIRATION})
export const verify = token => jwt.verify(token, secret)
