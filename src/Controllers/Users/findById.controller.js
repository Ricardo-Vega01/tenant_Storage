import { getTenantService } from "../../Services/Tenants/getTenant.service.js";

export const getUserById = async (req, res) => {
  const prisma = getTenantService(req.tenant.dbUrl);
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: { id: true, name: true, email: true, role: true },
    });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
};
