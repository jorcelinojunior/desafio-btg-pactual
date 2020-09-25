import * as jwt  from './../utils/jwt'
import {UserModel} from './../models/User'

exports.signUp = async (req, res, next) => {
    try{
        const result = await UserModel.create(req.body)

        const { password, ...user } = result.toObject()
    
        const token = jwt.sign({user: user.id})

        res.status(201)
        res.send({user, token})
        
    }catch (error) {
        res.send(400, error)
    }
}

exports.login = async (req, res, next) => {
    const [hashType, hash] = req.headers.authorization.split(' ')
    const [email, password] = Buffer.from(hash,'base64').toString().split(':')

    try {
        const user = await UserModel.findOne({ email, password })

        if(!user){
            return res.send(401)
        }

        const token = jwt.sign({ user: user.id})
        res.status(200)
        res.send({user, token})

    }catch (error) {
        res.send(error)
    }
}

exports.user = async (req, res, next) => {
    try {
        const users = await UserModel.find()
        res.status(200)
        res.send(users)

    } catch (error) {
        res.send(error)
    }
}