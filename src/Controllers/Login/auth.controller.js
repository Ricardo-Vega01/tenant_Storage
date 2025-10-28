import { getTenantService } from "../../Services/Tenants/getTenant.service.js";
import { generateToken } from "../../Utils/Auth/generateToken.util.js";
import { hashRefreshToken } from "../../Utils/Auth/hashToken.util.js";
import { genRefreshToken } from "../../Utils/Auth/refreshToken.util.js";
import { verifyPassword } from "../../Utils/Auth/verifyPass.util.js";

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const { tenant } = req;

  const prisma = getTenantService(tenant.dbUrl);

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid)
      return res.status(401).json({ error: "Credenciales inválidas" });

    // Generar tokens
    const payload = { userId: user.id, tenantId: tenant.id, role: user.role };
    const accessToken = generateToken(payload);
    const refreshToken = genRefreshToken(payload);
    const refreshTokenHash = await hashRefreshToken(refreshToken);

    // Guardar sesión
    await prisma.userSession.create({
      data: {
        userId: user.id,
        refreshTokenHash,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        deviceId: req.body.deviceId || null,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
      },
    });

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno al iniciar sesión" });
  }
};
