import multer from "multer";

const storage = multer.memoryStorage();

const soloImagen = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
       cb(null,true);
    } else {
       cb(new Error("Solo se permiten archivos de imagen"), false);
    }
};
export const upload = multer({ 
    storage,
     fileFilter: soloImagen,
    limits: { fileSize: 4 * 1024 * 1024 } 
})

export const subirImagen = upload.single("image");
export const manejarErroresDeMulter = (error, req, res, next) => {
    if(error?.name === "MulterError") {
        if(error.code === "LIMIT_FILE_SIZE"){
            return res.status(400).json({ error: "La imagen no puede pesar mas de 4 MB" })
        }
        if(error.code === "LIMIT_UNEXPECTED_FILE"){
            return res.status(400).json({ error: `No esperaba un archivo en el campo "${error.field}". El campo tiene que llamarse "image"`})
        }
        return res.status(400).json({error: "No se pudo procesar el archivo"})
    }
    if(error?.message === "Solo se pueden subir archivos de imagen"){
        return res.status(400).json({error: error.message})
    }
     if(error?.message?.includes("Boundary not found")){
        return res.status(400).json({
            error: "No se pudo procesar el archivo. Asegúrate de que la solicitud sea multipart/form-data y que el campo de la imagen se llame 'image'"
        })
    }
    next(error)
}
