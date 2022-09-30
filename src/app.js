import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import  { connectMongo }  from './config/mongo-connect';

const PORT = 8080
const app = express();

app.use(bodyParser.json());
//https debug
app.use(morgan("dev"))

connectMongo()

app.listen(PORT, () => {
    // console.log(`Server is running on isProductionss => ${isProduction}`);
    console.log(`Server is running on PORT ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('hello')
})