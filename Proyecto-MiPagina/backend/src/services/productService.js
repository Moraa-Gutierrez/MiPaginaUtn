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
        finalMaterial = data.material || "yeso"||"cemento";
    }

    try {
        const newProduct = await Product.create({
            ...data,
            category_id: Number(data.category_id),
            material: finalMaterial
        });

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
    if (data.category_id && Number(data.category_id) !== 5) {
        data.material = null;
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            data,
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
