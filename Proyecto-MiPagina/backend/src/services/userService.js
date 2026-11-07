import {Usuario} from '../models/user.js';
import {ErrorApp} from '../utils/ErrorApp.js';

export const getUsersService = async () => {
    return await Usuario.find().sort({ createdAt: -1 });
}

export const getUserByIdService = async (id) => {
    return await Usuario.findById(id);
}

export const createUserService = async (data) => {
    return await Usuario.create(data);
}
export const verificarUsuarioService = async (usuarioId) => {
  const existeUsuario = await Usuario.exists({ _id: usuarioId });
  if (!existeUsuario) {
    throw new ErrorApp(`No existe ningún usuario con el id ${usuarioId}`, 404);
  }
}
export const findByEmailWithPasswordService = async (email = "") => {
return await Usuario.findOne({ email: email.toLowerCase().trim() }).select("+password")
}

export const dataPublicUser = (usuario) => ({
    _id: usuario._id,
    name: usuario.name || usuario.nombre,        
    lastname: usuario.lastname || usuario.apellido, 
    email: usuario.email,
    role: usuario.role || usuario.rol,
    active: usuario.active !== undefined ? usuario.active : true             
});

export const updateUserRoleService = async (id, role) => {
    // Normalizar role: acepta 'customer' o 'comprador', y 'admin'
    const normalizedRole = (role === "customer" || role === "comprador") ? "comprador" : role;
    const validRoles = ["comprador", "customer", "admin", "vendedor"];
    if (!validRoles.includes(role)) {
        throw new ErrorApp("Rol no válido. Los roles permitidos son: customer/comprador, admin", 400);
    }

    const updatedUser = await Usuario.findByIdAndUpdate(
        id,
        { role: normalizedRole },
        { returnDocument: "after", runValidators: true }
    );
    if (!updatedUser) {
        throw new ErrorApp(`Usuario con ID ${id} no encontrado`, 404);
    }
    return updatedUser;
};

export const updateUserStatusService = async (id, active) => {
    const updatedUser = await Usuario.findByIdAndUpdate(
        id,
        { active: Boolean(active) },
        { returnDocument: "after", runValidators: true }
    );
    if (!updatedUser) {
        throw new ErrorApp(`Usuario con ID ${id} no encontrado`, 404);
    }
    return updatedUser;
};

export const deleteUserService = async (id) => {
    const user = await Usuario.findById(id);
    if (!user) {
        throw new ErrorApp(`Usuario con ID ${id} no encontrado`, 404);
    }
    // Baja lógica (active = false)
    user.active = false;
    await user.save();
    return user;
};