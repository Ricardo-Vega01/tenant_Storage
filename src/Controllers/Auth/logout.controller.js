import { logoutService } from "../../Services/Auth/logout.service.js";

export async function logoutController(req, res) {
    try {
        const { refreshToken, deviceId } = req.body;
        const userId = req.user.id;
        const result = await logoutService({ userId, refreshToken, deviceId });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}
