import { findUserService } from "../../Services/User/findUser.service.js";

export async function getUser(req, res) {
    try {
        const user = await findUserService(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
