import { prisma } from "../../Database/client.js";
import { accessJWT, refreshJWT } from "../../Utils/Auth/jwt.utils.js";
import { PasswordUtils } from "../../Utils/Auth/password.util.js";
import { logAction } from "../Logs/action.service.js";
import { createSession } from "../Session/session.service.js";


export async function loginService(
    { email, password, ipAddress, userAgent, deviceId },
) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Credenciasles invalidas");

    if (user.state === "Inactive" || user.state === "Deleted") {
        throw new Error("Acceso deneagado, este usuario no es valido");
    }

    const validatePassword = await PasswordUtils.comparePassword(
        password,
        user.password,
    );

    if (!validatePassword) throw new Error("Credenciales invalidas");

    // Create a new access token
    const accessToken = accessJWT.createToken({
        userId: user.id,
        role: user.role,
    });

    // Create refresh new token
    const refreshToken = refreshJWT.createToken({
        userId: user.id,
    });

    // Save session whit using class hash
    await createSession({
        userId: user.id,
        refreshToken,
        ipAddress,
        userAgent,
        deviceId,
    });

    // log to action
    await logAction({
        userId: user.id,
        action: "LOGIN",
        entityId: user.id,
        entityType: "User",
    });

    const { password: _password, ...safeUser } = user;
    return { user: safeUser, accessToken, refreshToken };
}
