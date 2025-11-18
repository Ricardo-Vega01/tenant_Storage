import { listUserService } from "../../Services/User/listUser.service.js";

export async function getAllUsers(req, res) {
    try {
        const users = await listUserService();

        res.json(users);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
