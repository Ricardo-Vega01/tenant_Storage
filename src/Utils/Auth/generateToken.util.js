import jwt from "jsonwebtoken";
import { accessTokenExpiry, accessTokenSecret } from "./token.config.js";

export const generateToken = (payload) => {
    return jwt.sign(payload, accessTokenSecret, {expiresIn: accessTokenExpiry});
}