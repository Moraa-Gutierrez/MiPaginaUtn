import * as authService from "../services/authService.js"
import * as userService from "../services/userService.js"
export const registrarController = async (req,res) =>
{
    const datos = await authService.registerService(req.body)
    res.status (201).json(datos)
}
export const loginController = async(req,res)=>
{
   const datos = await authService.loginService(req.body)
   res.status(200).json(datos) 
}
export const perfilController = async(req, res) =>
{
    const usuario = await userService.getUserByIdService(req.usuario.id)
    if (!usuario){
        return res.status(404).json({error:"Ese usuario ya no existe"})
       

    }
 res.status(200).json(usuario)
}