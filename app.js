import express, { request } from 'express';
import bodyParser from 'body-parser';

const PORT = 8080
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.send('Hello')
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})