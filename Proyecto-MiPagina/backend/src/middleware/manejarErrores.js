export const manejarErrores = (error, req, res, next) => {
    if (error.name === "ErrorApp") {
        return res.status(error.status).json({ error: error.message })
    }
    next(error)
    if (error.type === "entity.parse.failed") {
        return res.status(400).json({ error: "El body no es un JSON válido" })
    }
    next(error)
    if (error.name === "CastError") {
        return res.status(400).json({ error: "Ese id no tiene un formato válido", recibido: error.value })
    }
    next(error)
      if (error.name === "ValidationError") {
        return res.status(400).json({
            error: "Los datos no son válidos",
            detalles: Object.values(error.errors).map(e => e.message)
        })
    }
    if (error.code === 11000) {
        return res.status(409).json({ error: "Ya existe un registro con ese dato", campo: Object.keys(error.keyPattern)[0] })
    }
    console.error(error)
    res.status(500).json({ error: "Error interno del servidor" })
}
