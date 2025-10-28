import { getTenantService } from "../../Services/Tenants/getTenant.service.js";

export const deleteUser = async (req, res) => {
  const prisma = getTenantService(req.tenant.dbUrl);
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};
