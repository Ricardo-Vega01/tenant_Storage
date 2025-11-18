function verifyUser(req, res, next) {
    if (req.user?.role !== "Admin") {
        return res.status(403).json({
            error: "Acceso denegado: se requieren permisos Admin",
        });
    }
    next();
}

export { verifyUser };
