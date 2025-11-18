import { logAction } from "../Logs/action.service.js";
import { revokeSession } from "./revokedSession.service.js";

export async function logoutService({ userId, refreshToken, deviceId }) {
    const revokedSession = await revokeSession({
        userId,
        refreshToken,
        deviceId,
    });

    if (!revokedSession) {
        throw new Error("Sesión no encontrada");
    }

    await logAction({
        userId,
        action: "LOGOUT",
        entityId: revokedSession.id,
        entityType: "Session",
    });

    return { message: "Sesión cerrada correctamente" };
}
