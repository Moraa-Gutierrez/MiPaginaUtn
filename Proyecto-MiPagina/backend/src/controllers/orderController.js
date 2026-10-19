import * as orderService from "../services/orderService.js";


export const getOrCreateCartController = async (req, res, next) => {
    try {
        const order = await orderService.getOrCreateCartService(req.usuario.id);
        return res.status(200).json(order);
    } catch (error) {
        next(error);
    }
}


export const addToCartController = async (req, res, next) => {
    try {
        const usuarioId = req.usuario.id;
        const { productId, quantity } = req.body;
        const order = await orderService.addToCartService(usuarioId, productId, quantity);
        return res.status(200).json(order);
    } catch (error) {
        next(error);
    }
}


export const removeFromCartController = async (req, res, next) => {
    try {
        const usuarioId = req.usuario.id;
        const { productId } = req.params; // Idealmente viene de la URL ej: /api/cart/items/:productId
        const order = await orderService.removeFromCartService(usuarioId, productId);
        return res.status(200).json(order);
    } catch (error) {
        next(error);
    }
}

export const checkoutOrderController = async (req, res, next) => {
    try {
        const usuarioId = req.usuario.id;
        const { shippingData } = req.body; 
        const order = await orderService.checkoutOrderService(usuarioId, shippingData);
        return res.status(201).json(order); 
    } catch (error) {
        next(error);
    }
}


export const getUserOrderController = async (req, res, next) => {
    try {
        const order = await orderService.getUserOrdersService(req.usuario.id);
        return res.status(200).json(order);
    } catch (error) {
        next(error);
    }
}