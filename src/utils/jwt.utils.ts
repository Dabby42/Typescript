import jsonwebtoken from 'jsonwebtoken';
import config from 'config';

export function signJwt(
    object: Object, 
<<<<<<< HEAD
    keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options?: jsonwebtoken.SignOptions| undefined
){

    const privateKey = Buffer.from(
        config.get<string>(keyName),
        "base64"
      ).toString("ascii"); 

    return jsonwebtoken.sign(object, privateKey, {
=======
    keyname: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options?: jwt.SignOptions| undefined
){

    const privateKey = config.get<string>(keyname); 

    return jwt.sign(object, privateKey, {
>>>>>>> d50211b6fb10b48c3563023836f2b666c3aaf8d6
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
<<<<<<< HEAD
        
=======
>>>>>>> d50211b6fb10b48c3563023836f2b666c3aaf8d6
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }
}