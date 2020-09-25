import mongoose from 'mongoose'
import { validateCPF } from '../utils/validators'

const PersonalDocumentSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },

        data :{
            type: Date,
            required: true
        },

        cpf: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: validateCPF,
                message: 'Invalid CPF'
            }
        },

        rg: {
            type: String,
            required: true
        },

        login: {
            type: String,
            required: true,  
        },

        ip: {
            type: String
        }
    }
)

export const PersonalDocumentModel = new mongoose.model('PersonalDocument', PersonalDocumentSchema)