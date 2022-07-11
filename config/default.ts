export default {
    port: process.env.PORT,
    dbUri: process.env.DB_URI,
    refreshTokenTtl:process.env.REFRESH_TOKEN_TTL,
    accessTokenTtl:process.env.ACCESS_TOKEN_TTL,
    accessTokenPrivateKey:process.env.ACCESS_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey:process.env.ACCESS_TOKEN_PUBLIC_KEY,
    refreshTokenPrivateKey:process.env.ACCESS_TOKEN_PRIVATE_KEY,
    saltWorkFactor: 10
}