import * as productService from "../services/productService.js";
export const getProductsController = async (req, res) => {
    const products = await productService.getProductService(req.query);
    res.status(200).json(products);
}

export const getProductByIdController = async (req, res) => {
    const product = await productService.getProductByIdService(req.params.id);
   if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }   
    res.status(200).json(product);
}

export const createProductController = async (req, res) => {
    const product = await productService.createProductService(req.body);
    res.status(201).json(product);
}

export const updateProductController = async (req, res) => {
    const product = await productService.updateProductService(req.params.id, req.body);
    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
}

export const deleteProductController = async (req, res) => {
    const product = await productService.deleteProductService(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado" });
}
