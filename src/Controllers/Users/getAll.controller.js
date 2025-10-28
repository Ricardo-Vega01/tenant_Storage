import { getTenantService } from "../../Services/Tenants/getTenant.service.js";

export const getAllUsers = async (req, res, next) => {
  const prisma = getTenantService(req.tenant.dbUrl);
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};
