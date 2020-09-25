import {PersonalDocumentModel} from './../models/PersonalDocument'
import {generateDocument} from './../utils/generateDocument'
import {getIPAddress} from './../utils/getIPAddress'

exports.createDocument = async (req, res, next) => {
    try {  
        let personalDocument = await PersonalDocumentModel.create({
            ...req.body, 
            login : req.auth.email,
            ip    : getIPAddress()
        })

        res.status(201)
        res.send({personalDocument})

        generateDocument(personalDocument)
    } catch (error) {
        res.send(error)
    }
}

exports.getDocuments = async (req, res, next) => {
    try {
        const email = req.auth.email
        const personalDocument = await PersonalDocumentModel.find({login: email})
        res.send({personalDocument}) 
     } catch (error) {
         res.send(error)
     }
}