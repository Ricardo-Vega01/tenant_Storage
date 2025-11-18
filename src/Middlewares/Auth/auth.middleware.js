import { prisma } from "../../Database/client.js";
import { accessJWT } from "../../Utils/Auth/jwt.utils.js";

export async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ error: "Token requerido" });
        }

        const token = authHeader.split(" ")[1]; // formato: "Bearer <token>"

        const decoded = accessJWT.verifyToken(token);

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });
        if (!user) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        if (user.state === "Inactive" || user.state === "Deleted") {
            return res.status(403).json({
                error: "Usuario suspendido o eliminado",
            });
        }

        req.user = { id: user.id, role: user.role };

        next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
}
