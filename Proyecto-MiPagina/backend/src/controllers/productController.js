import * as productService from "../services/productService.js";
import { subir as subirLocal } from "../services/storage/local.js";
import { subir as subirSupabase } from "../services/storage/supabase.js";
import { STORAGE } from "../utils/config.js";

const uploadFile = async (file, categoryId) => {
    if (!file) return null;
    const uploader = STORAGE === "supabase" ? subirSupabase : subirLocal;


    return STORAGE === "supabase" ? await uploader(file, categoryId) : await uploader(file);
};

export const getProductsController = async (req, res, next) => {
    try {
        const products = await productService.getProductService(req.query);
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const getProductByIdController = async (req, res, next) => {
    try {
        const product = await productService.getProductByIdService(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const createProductController = async (req, res, next) => {
    try {
        const datosBody = req.body || {};

        if (req.file) {
            datosBody.image = await uploadFile(req.file, datosBody.category_id);
        }

        const product = await productService.createProductService(datosBody);
        res.status(201).json(product);
    } catch (error) {
        console.error("❌ Error en createProductController:", error);
        const statusCode = error.statusCode || error.status || 500;
        res.status(statusCode).json({
            mensajeError: error.message || "Error al crear el producto",
            detalles: error.error_description || error.error || error.errors || error.message || error
        });
    }
};

export const updateProductController = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.image = await uploadFile(req.file, req.body.category_id);
        }
        const product = await productService.updateProductService(req.params.id, req.body);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("❌ Error en updateProductController:", error);
        next(error);
    }
};

export const deleteProductController = async (req, res, next) => {
    try {
        const product = await productService.deleteProductService(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
        next(error);
    }
};