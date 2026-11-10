import { Product } from "../models/product.js";
import { ErrorApp } from "../utils/ErrorApp.js";

// 1. Get all products with optional filters
export const getProductService = async ({ category_id, active, highlighted } = {}) => {
    const filter = {};
    
    if (category_id) filter.category_id = Number(category_id);
    if (active !== undefined) filter.active = active === "true";
    if (highlighted !== undefined) filter.highlighted = highlighted === "true";

    return await Product.find(filter).sort({ createdAt: -1 });
};

// 2. Get product by ID
export const getProductByIdService = async (id) => {
    const product = await Product.findById(id);
    
    if (!product) {
        throw new ErrorApp(`Product with id ${id} not found`, 404);
    }
    
    return product;
};

// 3. Create a new product
export const createProductService = async (data) => {
    let finalMaterial = null;
    if (Number(data.category_id) === 5) {
        finalMaterial = data.material || "yeso";
    }

    try {
        const productPayload = {
            ...data,
            category_id: Number(data.category_id),
            material: finalMaterial
        };

        if (data.price !== undefined) productPayload.price = Number(data.price);
        if (data.quantity !== undefined) productPayload.quantity = Number(data.quantity);
        if (data.active !== undefined) productPayload.active = String(data.active) === "true" || data.active === true;
        if (data.highlighted !== undefined) productPayload.highlighted = String(data.highlighted) === "true" || data.highlighted === true;

        const newProduct = await Product.create(productPayload);
        return newProduct;
    } catch (error) {
        if (error.code === 11000) {
            throw new ErrorApp(`A product with those unique details already exists`, 409);
        } else {
            throw error;
        }
    }
};

// 4. Update an existing product
export const updateProductService = async (id, data) => {
    const updatePayload = { ...data };

    if (updatePayload.category_id !== undefined) {
        updatePayload.category_id = Number(updatePayload.category_id);
        if (updatePayload.category_id !== 5) {
            updatePayload.material = null;
        }
    }

    if (updatePayload.price !== undefined) updatePayload.price = Number(updatePayload.price);
    if (updatePayload.quantity !== undefined) updatePayload.quantity = Number(updatePayload.quantity);
    if (updatePayload.active !== undefined) updatePayload.active = String(updatePayload.active) === "true" || updatePayload.active === true;
    if (updatePayload.highlighted !== undefined) updatePayload.highlighted = String(updatePayload.highlighted) === "true" || updatePayload.highlighted === true;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updatePayload,
            { 
                returnDocument: "after", 
                runValidators: true // Forces Mongoose to run schema validators on updates
            }
        );

        if (!updatedProduct) {
            throw new ErrorApp(`Product with id ${id} not found for update`, 404);
        }

        return updatedProduct;
    } catch (error) {
        if (error.code === 11000) {
            throw new ErrorApp(`Duplicate data conflict while updating`, 409);
        } else {
            throw error;
        }
    }
};

// 5. Delete a product
export const deleteProductService = async (id) => {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        throw new ErrorApp(`Product with id ${id} not found for deletion`, 404);
    }

    return deletedProduct;
};
