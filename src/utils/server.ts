import bodyParser from 'body-parser';
import express from 'express';
import { deserializeUser } from '../middleware/deserializeUser';
import routes from '../routes';

const createServer = () => {
    const app = express();

    app.use(bodyParser.json())

    app.use(deserializeUser);

    routes(app);

    return app;
}

export default createServer;