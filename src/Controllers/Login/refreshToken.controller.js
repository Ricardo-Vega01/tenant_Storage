import { getTenantService } from "../../Services/Tenants/getTenant.service.js";
import { generateToken } from "../../Utils/Auth/generateToken.util.js";
import { hashRefreshToken } from "../../Utils/Auth/hashToken.util.js";
import { genRefreshToken } from "../../Utils/Auth/refreshToken.util.js";
import { verifyToken } from "../../Utils/Auth/verifyToken.util.js";

export const refreshTokenHandler = async (req, res) => {
  const { refreshToken } = req.body;
  const { tenant } = req;

  if (!refreshToken) return res.status(400).json({ error: 'Refresh token requerido' });

  try {
    // Verificar token
    const payload = verifyToken(refreshToken, 'refresh');
    const prisma = getTenantService(tenant.dbUrl);

    // Buscar sesión válida
    const hashedToken = await hashRefreshToken(refreshToken);
    const session = await prisma.userSession.findFirst({
      where: {
        userId: payload.userId,
        refreshTokenHash: hashedToken,
        revoked: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (!session) return res.status(401).json({ error: 'Refresh token inválido o expirado' });

    // Rotar tokens
    const newAccessToken = generateToken(payload);
    const newRefreshToken = genRefreshToken (payload);
    const newRefreshTokenHash = await hashRefreshToken(newRefreshToken);

    // Revocar el token anterior
    await prisma.userSession.update({
      where: { id: session.id },
      data: { revoked: true },
    });

    // Crear nueva sesión
    await prisma.userSession.create({
      data: {
        userId: payload.userId,
        refreshTokenHash: newRefreshTokenHash,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        deviceId: req.body.deviceId || null,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error('Error en refresh token:', error);
    res.status(401).json({ error: 'Token inválido o error interno' });
  }
};
