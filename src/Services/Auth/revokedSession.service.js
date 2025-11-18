import { prisma } from "../../Database/client.js";
import { PasswordUtils } from "../../Utils/Auth/password.util.js";


export async function revokeSession({ userId, refreshToken, deviceId }) {
    const sessions = await prisma.userSession.findMany({
        where: { userId, deviceId, revoked: false },
    });

    for (const session of sessions) {
        const isValid = await PasswordUtils.comparePassword(
            refreshToken,
            session.refreshTokenHash,
        );
        if (isValid) {
            return await prisma.userSession.update({
                where: { id: session.id },
                data: { revoked: true },
            });
        }
    }
    return null;
}
