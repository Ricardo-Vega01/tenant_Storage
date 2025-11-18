import { prisma } from "../../Database/client.js";
import bcrypt from "bcrypt";

async function createUserService(
    { email, name, password, role = "user", createdBy },
) {
    try {
        const existUser = await prisma.user.findUnique({ where: { email } });
        if (existUser) {
            throw new Error("Este correo ya esta registrado");
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                passwordHash,
                role,
            },
        });

        await logAction({
            userId: createdBy,
            action: "Create_user",
            entityId: newUser.id,
            entityType: "User",
        });

        const { password: _, ...safeUser } = newUser;

        return safeUser;
    } catch (error) {
        throw new Error("Error al crear el usuario", error);
    }
}

export { createUserService };
