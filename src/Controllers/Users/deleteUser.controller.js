import { deleteUserService } from "../../Services/User/deleteUser.service.js";

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const deletedBy = req.user.id;

        const user = await deleteUserService({ userId: id, deletedBy });
        return res.status(200).json({ user });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
