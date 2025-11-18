import { refreshService } from "../../Services/Auth/refresh.service.js";

export async function refreshController(req, res) {
    try {
        const { refreshToken, deviceId } = req.body;
        const result = await refreshService({ refreshToken, deviceId });

        return res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
