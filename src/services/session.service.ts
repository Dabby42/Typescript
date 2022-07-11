import { FilterQuery, UpdateQuery } from 'mongoose';
import config from 'config';
import {get} from 'lodash';
import Session, { SessionDocument } from '../model/session.model'
import { verifyJwt, signJwt } from '../utils/jwt.utils';
import { findUser } from './user.service';

export const createSession = async (userId:string, userAgent: string) => {
    let session = new Session({user: userId, agent: userAgent})
    await session.save();

    return session.toJSON();
}

export const findSessions = async (query: FilterQuery<SessionDocument>) => {
    let sessions = await Session.find(query).lean();

    return sessions;
}

export const updateSesssion = async (query: FilterQuery<SessionDocument>, updateQuery: UpdateQuery<SessionDocument>) => {
    return await Session.findOneAndUpdate(query,updateQuery);
}

export const reissueAccessToken = async({refreshToken}:{refreshToken: string}) => {
    const {decoded} = verifyJwt(refreshToken, 'refreshTokenPublicKey');
    
    if(!decoded || !get(decoded, 'session')){
        return false;
    }
    
    const session = await Session.findById({_id: get(decoded, 'session')})
    
    if(!session || !session.valid){
        return false
    };

    const user = await findUser({_id: session.user});
    
    if(!user) return false

    const accessToken = signJwt(
        { ...user, session: session._id },
        "accessTokenPrivateKey",
        { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );

    return accessToken;

}