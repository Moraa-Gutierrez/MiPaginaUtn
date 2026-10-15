import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre del producto es obligatorio"],
        trim: true,
        minLength: [3, "El nombre del producto necesita al menos 3 caracteres"],
        maxLength: [100, "El nombre del producto no puede ser mayor a 100 caracteres"]
    },
    price: {
        type: Number,
        required: [true, "El precio del producto es obligatorio"],
        min: [0, "El precio del producto no puede ser negativo"]
    },
    description: {
        type: String,
        required: [true, "La descripción del producto es obligatoria"],
        maxLength: [500, "La descripción del producto no puede ser mayor a 500 caracteres"]
    },
    quantity: {
        type: Number,
        required: [true, "La cantidad en stock es obligatoria"],
        min: [0, "La cantidad no puede ser negativa"],
        default: 1
    },
    active: {
        type: Boolean,
        default: true
    },
    highlighted: {
        type: Boolean,
        default: false
    },
    category_id: {
        type: Number,
        required: [true, "La categoría es obligatoria"],
        enum: {
            values: [1, 2, 3, 4, 5],
            message: "La categoría no es válida (debe ser un valor entre 1 y 5)"
        }
    },
    image: {
        type: String,
        default: ""
    },
    material: {
        type: String,
        enum: ['yeso', 'cemento', null],
        default: null,
    }
}, {
    timestamps: true
});

export const Product = mongoose.model("Product", productSchema);