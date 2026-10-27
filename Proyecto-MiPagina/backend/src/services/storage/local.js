import path from "node:path";
import fs from "fs/promises"
import { CARPETA_IMAGENES, API_URL } from "../../utils/config.js";
import { nombreUnico } from "./nombreUnico.js";
import { constants } from "node:buffer";

export const subir = async(file) =>
{
   const nombre = nombreUnico(file.originalname)
   const carpeta = path.resolve(CARPETA_IMAGENES)

   await fs.mkdir(carpeta, {recursive: true})
   await fs.writeFile(path.join(carpeta,nombre),file.buffer)

   return`${API_URL}/${CARPETA_IMAGENES}/${nombre}`
} 

export const borrar = async (url) => {
    const nombre = path.basename(new URL(url).pathname)
    await fs.rm(path.join(path.resolve(CARPETA_IMAGENES),nombre),{force:true})
}