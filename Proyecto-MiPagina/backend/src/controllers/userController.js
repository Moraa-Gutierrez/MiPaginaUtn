import * as userService from '../services/userService.js';

export const getUsersController = async (req, res, next) => {
    try {
        const usuarios = await userService.getUsersService();
        res.status(200).json(usuarios);
    } catch (error) {
        next(error);
    }
};

export const getUserByIdController = async (req, res, next) => {
    try {
        const usuario = await userService.getUserByIdService(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
};

export const createUserController = async (req, res, next) => {
    try {
        const usuario = await userService.createUserService(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        next(error);
    }
};

export const updateUserRoleController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.body || {};
        if (!role) {
            return res.status(400).json({ error: "El rol es requerido" });
        }
        const updatedUser = await userService.updateUserRoleService(id, role);
        return res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const updateUserStatusController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { active } = req.body || {};
        if (active === undefined) {
            return res.status(400).json({ error: "El estado active es requerido" });
        }
        const updatedUser = await userService.updateUserStatusService(id, active);
        return res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const deleteUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await userService.deleteUserService(id);
        return res.status(200).json({ message: "Usuario dado de baja exitosamente", user: result });
    } catch (error) {
        next(error);
    }
};