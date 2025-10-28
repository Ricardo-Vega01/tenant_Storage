import { accessTokenSecret, refreshTokenSecret } from "./token.config.js"
import jwt from "jsonwebtoken";

export const verifyToken = (token, type = 'access') => {
    const secret = type == 'access' ? accessTokenSecret: refreshTokenSecret;

    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error('Token invalid o expirado')
    }
}