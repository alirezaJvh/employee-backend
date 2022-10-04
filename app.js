import express, { request } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectMongo } from './config/database';
import { AppRoutes } from './routes/index'

dotenv.config()
const { API_PORT } = process.env 
const app = express();

app.use(bodyParser.json());
//https debug
app.use(morgan("dev"))

connectMongo()

AppRoutes.forEach(route => {
    app[route.method](route.path, route.middlewares, (request, response, next) => {
        route
            .action(request, response)
            .then(() => next)
            .catch(err => next(err))
    })
})

app.listen(API_PORT, () => {
    console.log(`Server is running on PORT ${API_PORT}`);
});
