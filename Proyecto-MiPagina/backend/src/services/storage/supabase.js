import { supabase } from "../../config/supabase.js";
import { CARPETA_IMAGENES } from "../../utils/config.js";
import { nombreUnico } from "./nombreUnico.js";


const carpetasCategorias = {
    1: "Perfumes",
    2: "Velas",
    3: "Accesorios",
    4: "Cuidados-Diarios",
    5: "FigurasYesoCemento"
};

const bucket = () => supabase.storage.from(CARPETA_IMAGENES);

export const subir = async (file, categoryId) => {
    const nombreArchivo = nombreUnico(file.originalname);
    const nombreCarpeta = carpetasCategorias[Number(categoryId)] || carpetasCategorias[categoryId] || "Perfumes";
    const rutaCompleta = `${nombreCarpeta}/${nombreArchivo}`;

    const { error } = await bucket().upload(rutaCompleta, file.buffer, {
        contentType: file.mimetype,
        upsert: false
    });
    
    if (error) {
        console.error("❌ Error en Supabase Storage upload:", {
            message: error.message,
            statusCode: error.statusCode,
            error: error.error,
            bucket: CARPETA_IMAGENES,
            rutaCompleta
        });
        throw error;
    }
    
    const { data } = bucket().getPublicUrl(rutaCompleta);
    return data.publicUrl;
};

export const borrar = async (url) => {

    const partes = url.split(`${CARPETA_IMAGENES}/`);
    if (partes.length < 2) return;
    const rutaRelativa = partes[1];

    const { error } = await bucket().remove([rutaRelativa]);
    if (error) throw error;
};