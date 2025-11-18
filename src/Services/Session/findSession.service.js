import { prisma } from "../../Database/client.js";
import { TokenUtils } from "../../Utils/Auth/token.utils.js";

export async function findSession({ userId, refreshToken, deviceId }) {
    const sessions = await prisma.userSession.findMany({
        where: { userId, deviceId, revoked: false },
    });

    for (const session of sessions) {
        const isValid = await TokenUtils.compare(
            refreshToken,
            session.refreshToken,
        );
        if (isValid && session.expiresAt > new Date()) {
            return session;
        }
    }

    return null;
}
