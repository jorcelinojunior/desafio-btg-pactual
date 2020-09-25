import mongoose from 'mongoose'
import Config from '../../config'

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = Config
const MONGO_URL = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

mongoose.connect(MONGO_URL, { useNewUrlParser: true})

const db = mongoose.connection

db.on('error', () => console.error('connection error:'))

db.once('open', () => console.log('database connected'))

db.on('disconnected', () => {
    console.error('MongoDB disconnected!')
    mongoose.connect(MONGO_URL, {server: {auto_reconnect: true}})
})

db.on('reconnected', () => console.info('MongoDB reconnected!'))
