import { url } from "node:inspector";
import { supabase } from "../../config/supabase.js";
import { CARPETA_IMAGENES } from "../../utils/config.js";
import { nombreUnico } from "./nombreUnico.js";


const bucket = () => supabase.storage.from(CARPETA_IMAGENES)
export const subir = async (file) => {
    const nombre = nombreUnico (file.originalname)

    const{error} = await bucket().upload (nombre, file.buffer,{
        contentType: file.mimetype,
        upsert: false
    })
    if(error) throw error
   const { data } = bucket().getPublicUrl(nombre);

    return data.publicUrl
}
export const borrar = async (url) =>{
    const nombre = url.split(`/${CARPETA_IMAGENES}/`).pop()
    if (!nombre|| nombre===url) return
    const {error} = await bucket().remove ([nombre])
        if(error) throw error
}
