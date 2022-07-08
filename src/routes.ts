import {Express, Request, Response} from 'express';
import { createUserSessionHandler } from './controllers/session.controller';
import { createUserHandler } from './controllers/user.controller';
import validate from './middleware/validateResource';
import createUserSchema from './schema/user.schema';
import createSessionSchema from './schema/session.schema';

export default (app: Express) => {
    app.get('/healthCheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    })

    app.post('/api/v1/user', validate(createUserSchema), createUserHandler)

    app.post('/api/v1/session', validate(createSessionSchema), createUserSessionHandler)
}