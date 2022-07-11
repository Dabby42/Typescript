export default {
    port: process.env.PORT,
    dbUri: process.env.DB_URI,
    refreshTokenTtl:'1y',
    accessTokenTtl:'15m',
    accessTokenPrivateKey:process.env.ACCESS_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey:process.env.ACCESS_TOKEN_PUBLIC_KEY,
    refreshTokenPrivateKey:process.env.REFRESH_TOKEN_PRIVATE_KEY,
    refreshTokenPublicKey:process.env.REFRESH_TOKEN_PUBLIC_KEY,
    saltWorkFactor: 10
}

//process.env.REFRESH_TOKEN_TTL
//process.env.ACCESS_TOKEN_TTL