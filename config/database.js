import mongoose from 'mongoose';
import { statuses } from './connection-status';
// import debug from 'debug';

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
        await mongoose.connect(process.env.MONGO_URL, dbOptions)
    } catch (e) {
        console.log('Error connecting to Mongo')
        console.log(e)
        process.exit(1)
    }
}

export { connectMongo }