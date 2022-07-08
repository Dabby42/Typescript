import {createSession} from '../services/session.service';
import {validatePassword} from '../services/user.service';
import {signJwt} from '../utils/jwt.utils';
import config from 'config';
import {Request, Response} from 'express';

export const createUserSessionHandler = async (req:Request, res:Response) => {
    //validate user password
    const user = await validatePassword(req.body);
    if(!user){
        return res.status(401).send('Invalid email or password')
    }
    //create a session
    const session = await createSession(user._id, req.get('user-agent') || '')
    
    //generate an access token
    const accessToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get<string>("accessTokenTtl")}
    )

    const refreshToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get<string>("refreshTokenTtl")}
    )

    return res.send({
        accessToken,
        refreshToken
    })

}