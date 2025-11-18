import jwt from "jsonwebtoken";
import { jwtConfig } from "../../Config/jwt.config.js";

class jwtService {
    constructor(secret, expires) {
        this.secret = secret;
        this.expires = expires;
    }

    createToken(payload) {
        return jwt.sign(payload, this.secret, { expiresIn: this.expires });
    }

    verifyToken(token) {
        return jwt.verify(token, this.secret);
    }
}

// Declare instances for access
export const accessJWT = new jwtService(
    jwtConfig.accessSecret,
    jwtConfig.accessExpiresIn,
);

export const refreshJWT = new jwtService(
    jwtConfig.refreshSecret,
    jwtConfig.refreshExpiresIn,
);
