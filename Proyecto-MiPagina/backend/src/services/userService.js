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
    role: usuario.role || usuario.rol             
});