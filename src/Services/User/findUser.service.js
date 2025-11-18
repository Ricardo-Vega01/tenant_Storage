import { prisma } from "../../Database/client.js";

export async function findUserService(id) {
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    return user;
}
