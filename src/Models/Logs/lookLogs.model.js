import { prisma } from "../../Database/client.js";

export async function lookLogsModel({ userId }) {
    const logs = await prisma.actionLog.findMany({ where: { userId } });
    
    return logs;
}
