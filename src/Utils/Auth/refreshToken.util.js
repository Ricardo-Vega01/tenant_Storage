import jwt from "jsonwebtoken";
import { refreshTokenExpiry, refreshTokenSecret } from "./token.config.js";

export const genRefreshToken = (payload) => {
    return jwt.sign(payload, refreshTokenSecret, {expiresIn: refreshTokenExpiry});
}