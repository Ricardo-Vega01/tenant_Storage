import { prisma } from "../../Database/client.js";
import { lookLogsModel } from "../../Models/Logs/lookLogs.model.js";
import { logAction } from "../Logs/action.service.js";
import { findUserService } from "./findUser.service.js";
export async function updateUserService({ userId, payload, updatedBy }) {
    try {
        // 1. Buscar usuario actual
        const user = await findUserService(userId);

        // 2. Validar cambio de estado
        let newState = payload.state ?? user.state;

        if (payload.state === "deleted") {
            const logs = await lookLogsModel(userId);
            if (logs.length > 0) {
                // No se puede eliminar → suspender
                newState = "inactive";
            }
        }

        // 3. Actualizar usuario
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: payload.name ?? user.name,
                email: payload.email ?? user.email,
                role: payload.role ?? user.role,
                state: newState,
                updatedAt: new Date(),
            },
        });

        // 4. Registrar acción en el log
        await logAction({
            userId: updatedBy,
            action: "UPDATE_USER",
            entityId: updatedUser.id,
            entityType: "User",
        });

        // 5. Retornar usuario actualizado (sin passwordHash)
        const { password, ...safeUser } = updatedUser;
        return safeUser;
    } catch (error) {
        throw new Error("Error al actualizar usuario: " + error.message);
    }
}
