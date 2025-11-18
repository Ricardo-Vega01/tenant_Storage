import { accessJWT, refreshJWT } from "../../Utils/Auth/jwt.utils.js";
import { logAction } from "../Logs/action.service.js";
import { findSession } from "../Session/findSession.service.js";
import { updateSession } from "../Session/updateSession.service.js";

export async function refreshService({ refreshToken, deviceId }) {
    // 1. Verificar firma del refreshToken
    let decoded;
    try {
        decoded = refreshJWT(refreshToken);
    } catch {
        throw new Error("Refresh token inválido o expirado");
    }

    const userId = decoded.userId;

    // 2. Buscar sesión activa usando session.service
    const session = await findSession({ userId, refreshToken, deviceId });
    if (!session) {
        throw new Error("Sesión no encontrada o token inválido");
    }

    // 3. Generar nuevo accessToken
    const accessToken = accessJWT({ userId, role: decoded.role });

    // 4. Actualizar sesión
    await updateSession({ sessionId: session.id });

    // 5. Registrar acción en log
    await logAction({
        userId,
        action: "REFRESH_TOKEN",
        entityId: session.id,
        entityType: "Session",
    });

    return { accessToken };
}
