import { prisma } from "../../Database/client.js";
import { PasswordUtils } from "../../Utils/Auth/password.util.js";

export async function createSession(
    { userId, refreshToken, ipAddress, userAgent, deviceId },
) {
    return await prisma.userSession.create({
        data: {
            userId,
            refreshTokenHash: await PasswordUtils.hashPassword(refreshToken),
            ipAddress,
            userAgent,
            deviceId,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
        },
    });
}

export async function deleteSession({ userId, deviceId }) {
    return await prisma.userSession.deleteMany({
        where: { userId, deviceId },
    });
}

export async function cleanExpiredSessions() {
    return await prisma.userSession.deleteMany({
        where: { expiresAt: { lt: new Date() } },
    });
}
