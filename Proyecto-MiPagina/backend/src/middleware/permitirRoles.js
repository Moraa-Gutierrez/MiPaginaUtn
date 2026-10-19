import { ErrorApp } from "../utils/ErrorApp.js";
export const permitirRoles = (...rolesPermitidos) => {
    return (req, res, next) => {
        const rolUsuario = req.usuario.role;
        if (!rolesPermitidos.includes(req.usuario.role)) {
            const error = new ErrorApp("No tienes permisos para realizar esta acción", 403);
            return next(error);
        }
        next();
    };
};