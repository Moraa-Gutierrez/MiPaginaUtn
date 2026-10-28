import jwt from "jsonwebtoken";
import {JWT_SECRET,JWT_EXPIRATION} from "../utils/config.js";
import {buscarPorEmailConPasswordService,createUserService,datosPublicosUsuario} from "./userService.js"
import { ErrorApp } from "../utils/ErrorApp.js";

const firmarToken = (usuario) => {
return jwt.sign({ id: usuario._id, role: usuario.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};
export const registrarService = async (formData = {}) => {
  // Aceptamos tanto las propiedades en inglés del front como las de backend
  const nombre = formData.name || formData.nombre;
  const apellido = formData.lastname || formData.apellido;
  const fechaNacimiento = formData.date || formData.fechaNacimiento;
  const { email, password } = formData;

  const usuario = await createUserService({
    name: nombre,         
    lastname: apellido,   
    date: fechaNacimiento, 
    email,
    password,
  });

  return {
    usuario: datosPublicosUsuario(usuario),
    token: firmarToken(usuario),
  };
};
export const loginService = async ({email,password}={})=> {
    if (!email || !password) {
    throw new Error("Faltan el email y/o la contraseña", 400);
  }
  const usuario = await buscarPorEmailConPasswordService(email);
if (!usuario || !(await usuario.compararPassword(password))) {
    throw new ErrorApp("Email o contraseña incorrectos", 401);
  }
  return {
    usuario: datosPublicosUsuario(usuario),
    token: firmarToken(usuario),
  };
};