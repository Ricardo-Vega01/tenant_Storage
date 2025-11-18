import { updateUserService } from "../../Services/User/updateUser.service.js";

export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedBy = req.user.id;

        const user = await updateUserService({ userId: id, data, updatedBy });
        return res.status(200).json({ user });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
