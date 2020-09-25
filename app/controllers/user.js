import * as jwt  from './../utils/jwt'
import {UserModel} from './../models/User'

exports.signUp = async (req, res, next) => {
    try{
        const result = await UserModel.create(req.body)
        const { password, ...user } = result.toObject()

        const token = jwt.sign({user: user.id})

        resp.send({user, token})
        
    }catch (error) {
        resp.send(400, error)
    }
}

exports.login =  async(req, resp, next) => {
    const [hashType, hash] = req.headers.authorization.split(' ')
    const [email, password] = Buffer.from(hash,'base64').toString().split(':')

    try {
        const user = await UserModel.findOne({ email, password })

        if(!user){
            return resp.send(401)
        }

        const token = jwt.sign({ user: user.id})
        resp.send({user, token})

    }catch (error) {
        resp.send(error)
    }
}

exports.user = async (req, res, next) => {
    try {
       const users = await UserModel.find()
        res.send(users)

    } catch (error) {
        res.send(error)
    }
}