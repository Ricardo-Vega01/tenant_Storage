import { getTenantService } from "../../Services/Tenants/getTenant.service.js";
import { verifyToken } from "../../Utils/Auth/verifyToken.util.js";

export const logoutHandler = async (req, res) => {
  const { refreshToken } = req.body;
  const { tenant } = req;

  if (!refreshToken) return res.status(400).json({ error: 'Refresh token requerido' });

  try {
    const payload = verifyToken(refreshToken, 'refresh');
    const prisma = getTenantService(tenant.dbUrl);
    
    await prisma.userSession.updateMany({
      where: {
        userId: payload.userId,
        deviceId: req.body.deviceId,
        revoked: false,
      },
      data: { revoked: true },
    });

    res.json({ message: 'Sesión cerrada correctamente' });
  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({ error: 'Error al cerrar sesión' });
  }
};