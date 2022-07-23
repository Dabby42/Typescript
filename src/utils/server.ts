import bodyParser from 'body-parser';
import express, {Request, Response} from 'express';
import { deserializeUser } from '../middleware/deserializeUser';
import routes from '../routes';
import {restResponseTimeHistogram} from './metrics'
import responseTime from 'response-time';


const createServer = () => {
    const app = express();

    app.use(bodyParser.json())

    app.use(deserializeUser);

    app.use(responseTime((req: Request, res: Response, time: number) => {
        if(req?.route?.path){
            restResponseTimeHistogram.observe(
                {
                    method: req.method,
                    route: req.route.path,
                    status_code: res.statusCode
                },
                time * 1000
            )
        }
    }))

    routes(app);

    return app;
}

export default createServer;