import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import connect from './utils/connect'

const app = express();

const port = config.get<string>('port');

app.listen(port, async () => {
    console.log(`App listening on http://localhost:${port}`);
    await connect();
})