import mongoose from 'mongoose';
import { statuses } from './connection-status';
// import debug from 'debug';


// TODO: place URL and password in other file
const MONGO_URL = 'mongodb+srv://alireza:alirezajj%4098@cluster0.xjammca.mongodb.net/?retryWrites=true&w=majorityt';
const dbOptions = {
    autoIndex: false,
}

statuses.forEach(({status, logMsg}) => {
    mongoose.connection.on(status, () => {
        console.log(logMsg)
    })
})

const connectMongo = async () => {
    try {
        await mongoose.connect(MONGO_URL, dbOptions)
    } catch (e) {
        console.log('Error connecting to Mongo')
        console.log(e)
        process.exit(1)
    }
}

export { connectMongo }