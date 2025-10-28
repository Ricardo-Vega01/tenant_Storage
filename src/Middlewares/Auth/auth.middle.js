import { verifyToken } from "../../Utils/Auth/verifyToken.util.js";
import { labels } from "../../Utils/labels.js";

export const authMiddle = (req, res, next) => {
    const token = req.headers.autrization?.split(' ')[1];
    if(!token) return res.status(401).json({error: labels.error.noToken});

    try {
        const payload = verifyToken(token, 'access');
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({error: labels.error.token})
    }
};