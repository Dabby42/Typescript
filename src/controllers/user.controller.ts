import {Request, Response} from 'express';
import { CreateUserInput } from '../schema/user.schema';
import {createUser} from '../services/user.service'
import {omit} from "lodash";

export const createUserHandler = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    try {
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), 'password'))
    } catch (error) {
        console.log(error);
        return res.status(409).send("Invalid Credentials")
    }
}