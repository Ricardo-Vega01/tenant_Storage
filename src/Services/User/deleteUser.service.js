import { prisma } from "../../Database/client.js";
import { lookLogsModel } from "../../Models/Logs/lookLogs.model.js";
import { logAction } from "../Logs/action.service.js";
import { findUserService } from "./findUser.service.js";

export async function deleteUserService({ userId, deletedBy }) {
    try {
        // look user
        await findUserService(userId);
        // look history to user catch
        const logs = await lookLogsModel(userId);

        let updatedUser;
        if (logs.length > 0) {
            updatedUser = await prisma.user.update({
                where: { id: userId },
                data: { state: "Inactive", updatedAt: new Date() },
            });
        } else {
            updatedUser = await prisma.user.update({
                where: { id: userId },
                data: { state: "Deleted", updatedAt: new Date() },
            });
        }

        await logAction({
            userId: deletedBy,
            action: "DELETE_USER",
            entityId: updatedUser.id,
            entityType: "User",
        });

        const { password, ...safeUser } = updatedUser;
        return safeUser;

    } catch (error) {
        throw new Error("Usuario no encontrado");
    }
}
