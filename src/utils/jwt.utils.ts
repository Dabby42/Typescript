import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get<string>('accessTokenPrivateKey');
const publicKey = config.get<string>('accessTokenPublicKey')

export const signJwt = (
    object: Object, 
    options?: jwt.SignOptions| undefined
) => {
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: 'RS256'
    }) 
} 

export const verifyJwt = (token: string) => {
    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }
}