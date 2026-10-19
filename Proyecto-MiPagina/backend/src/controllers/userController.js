import * as userService from '../services/userService.js';
export const getUsersController = async (req, res) => {
    const usuarios = await userService.getUsersService();
    res.status(200).json(usuarios);
}

export const getUserByIdController = async (req, res) => {
    const usuario = await userService.getUserByIdService(req.params.id);
    if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
}
export const createUserController = async (req, res) => {
    const usuario = await userService.createUserService(req.body);
    res.status(201).json(usuario);
}