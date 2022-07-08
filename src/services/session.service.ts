import Session from '../model/session.model'

export const createSession = async (userId:string, userAgent: string) => {
    let session = new Session({userId, userAgent})
    await session.save();

    return session;
}