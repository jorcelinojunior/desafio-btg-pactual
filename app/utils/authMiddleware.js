import * as jwt from './jwt'
import { UserModel } from './../models/User'

export const authMiddleware = async (req, res, next) =>{
    const [hashType, token] = req.headers.authorization.split(' ')

    try {
        const payload = await jwt.verify(token)
        const user    = await UserModel.findById(payload.user)

        req.auth = user
        next()
    } catch (error) {
        res.send(401, error)
    }
}