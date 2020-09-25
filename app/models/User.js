import mongoose from 'mongoose'
import crypto   from 'crypto'

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            unique: true,
            match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            required: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            select: false,
            set: value =>
                crypto
                .createHash('md5')
                .update(value)
                .digest('hex')
        }
    }, 
    {
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
        toObject: { virtuals: true, getters: true }
    }
)

export const UserModel = mongoose.model('User', UserSchema)