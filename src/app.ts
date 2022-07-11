import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import connect from './utils/connect'
import { deserializeUser } from './middleware/deserializeUser';
import route from './routes'

const app = express();

app.use(bodyParser.json())

app.use(deserializeUser);

const port = config.get<number>('port');

app.listen(port, async () => {
    console.log(`App listening on http://localhost:${port}`);
    await connect();
    route(app)
})