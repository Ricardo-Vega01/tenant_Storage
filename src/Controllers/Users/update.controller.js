import { getTenantService } from "../../Services/Tenants/getTenant.service.js";

export const updateUser = async (req, res) => {
  const prisma = getTenantService(req.tenant.dbUrl);
  const { name, role } = req.body;
  try {
    const updated = await prisma.user.update({
      where: { id: req.params.id },
      data: { name, role },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};
