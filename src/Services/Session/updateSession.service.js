import { prisma } from "../../Database/client.js";

export async function updateSession({ sessionId }) {
    return await prisma.userSession.update({
        where: { id: sessionId },
        data: { lastUsedAt: new Date() },
    });
}
