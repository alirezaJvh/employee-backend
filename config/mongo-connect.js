import mongoose from 'mongoose';
import { statuses } from './connection-status';
// import debug from 'debug';

// const log = debug('MongoDB')

statuses.forEach(({status, logMsg}) => {
    mongoose.connection.on(status, () => {
        console.log(logMsg)
    })
})
// TODO: place URL and password in other file
const password = encodeURIComponent('alirezajj@98')
const URL = `mongodb+srv://alireza:${password}@cluster0.xjammca.mongodb.net/?retryWrites=true&w=majorityt`
const dbOptions = {
    autoIndex: false,
}

const connectMongo = async () => {
    try {
        await mongoose.connect(URL, dbOptions)
    } catch (e) {
        console.log('Error connecting to Mongo')
    }
}

export { connectMongo }