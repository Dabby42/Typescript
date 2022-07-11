import jwt from 'jsonwebtoken';
import config from 'config';

export function signJwt(
    object: Object, 
    keyname: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options?: jwt.SignOptions| undefined
){

    const privateKey = config.get<string>(keyname); 

    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: 'RS256'
    }) 
} 

export const verifyJwt = (
    token: string,
    keyname: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
    ) => {

    const publicKey = config.get<string>(keyname);

    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }
}