import jsonwebtoken from 'jsonwebtoken';
import config from 'config';

export function signJwt(
    object: Object, 
    keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options?: jsonwebtoken.SignOptions| undefined
){

    const privateKey = Buffer.from(
        config.get<string>(keyName),
        "base64"
      ).toString("ascii"); 

    return jsonwebtoken.sign(object, privateKey, {
        ...(options && options),
        algorithm: 'RS256'
    }) 
} 

export const verifyJwt = (
    token: string,
    keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
    ) => {

    const publicKey = Buffer.from(
        config.get<string>(keyName),
        "base64"
      ).toString("ascii"); 

    try {
        const decoded = jsonwebtoken.verify(token, publicKey);
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