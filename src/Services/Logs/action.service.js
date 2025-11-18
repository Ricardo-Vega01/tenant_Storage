import { prisma } from "../../Database/client.js";

export async function logAction({ userId, action, entityId, entityType }) {
    await prisma.actionLog.create({
        data: {
            userId,
            action,
            entityId,
            entityType,
            timestamp: new Date(),
        },
    });
}
