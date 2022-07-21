import {Express, Request, Response} from 'express';
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionHandler } from './controllers/session.controller';
import { createUserHandler } from './controllers/user.controller';
import validate from './middleware/validateResource';
import createUserSchema from './schema/user.schema';
import createSessionSchema from './schema/session.schema';
import {createProductSchema, getProductSchema, updateProductSchema, deleteProductSchema} from './schema/product.schema'
import requireUser from './middleware/requireUser';
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from './controllers/product.controller';

export default (app: Express) => {
    app.get('/healthCheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    })

    app.post('/api/users', validate(createUserSchema), createUserHandler)

    app.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler)

    app.get('/api/sessions', requireUser, getUserSessionHandler);

    app.delete('/api/sessions/me', requireUser, deleteUserSessionHandler);

    app.post('/api/product', [requireUser, validate(createProductSchema)], createProductHandler);

    app.get('/api/product/:productId', validate(getProductSchema), getProductHandler);

    app.put('/api/product/:productId', [requireUser, validate(updateProductSchema)], updateProductHandler);

    app.delete('/api/product/:productId', [requireUser, validate(deleteProductSchema)], deleteProductHandler);
}