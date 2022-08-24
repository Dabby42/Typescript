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

    /**
     * @openapi
     * /healthcheck:
     *  get:
     *    tags:
     *    - HealthCheck
     *    description: Responds if the app is up and running    
     *    responses:
     *      200:
     *        description: App is up and running       
     */
    app.get('/healthCheck', (req: Request, res: Response) => {
        res.sendStatus(200);
    })

    /**
     * @openapi
     * '/api/users':
     *  post:
     *     tags:
     *     - User
     *     summary: Register a User
     *     requestBody:
     *        required: true
     *        content:
     *           application/json:
     *              schema:
     *                 $ref: '#/components/schemas/CreateUserInput'
     *     responses:
     *        200:
     *           description: Success
     *           content:
     *               application/json:
     *                   schema:
     *                      $ref: '#/components/schemas/CreateUserResponse'
     *        409:
     *           description: Conflict
     *        400:
     *           description: Bad request
     */
    app.post('/api/users', validate(createUserSchema), createUserHandler)

    app.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler)

    app.get('/api/sessions', requireUser, getUserSessionHandler);

    app.delete('/api/sessions/me', requireUser, deleteUserSessionHandler);

    app.post('/api/product', [requireUser, validate(createProductSchema)], createProductHandler);

    /**
     * @openapi
     * '/api/product/{productId}':
     *  get:
     *    tags:
     *      - Products
     *    summary: Get a single product by the productId
     *    parameters:
     *      - name: productId
     *        in: path
     *        required: true
     *        description: The id of the product
     *    responses:
     *       200:
     *          description: Success
     *          content: 
     *             application/json:
     *                 schema: 
     *                    $ref: '#/components/schemas/Product'
     *       400:
     *          description: Product not found
     */
    app.get('/api/product/:productId', validate(getProductSchema), getProductHandler);

    app.put('/api/product/:productId', [requireUser, validate(updateProductSchema)], updateProductHandler);

    app.delete('/api/product/:productId', [requireUser, validate(deleteProductSchema)], deleteProductHandler);
}