import mongoose from "mongoose";

// Sub-esquema para los ítems embebidos (con snapshot del producto al momento de la compra)
const orderItemSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "El ID del producto es obligatorio"]
    },
    product_name: {
        type: String,
        required: [true, "El nombre del producto es obligatorio"]
    },
    unit_price: {
        type: Number,
        required: [true, "El precio unitario es obligatorio"]
    },
    quantity: {
        type: Number,
        required: [true, "La cantidad es obligatoria"],
        min: [1, "La cantidad mínima debe ser 1"]
    }
}, { _id: false });

// Sub-esquema para los datos de envío (opcional si está en draft)
const shippingSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip_code: { type: String, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    order_number: {
        type: String,
        default: null // Será null mientras esté en borrador (draft) y se asigna al confirmar
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "El usuario es obligatorio"]
    },
    status: {
        type: String,
        enum: ["draft", "pending", "confirmed", "shipped"],
        default: "draft" // El carrito activo arranca como borrador
    },
    total_amount: {
        type: Number,
        required: [true, "El monto total es obligatorio"],
        min: [0, "El total no puede ser negativo"],
        default: 0
    },
    items: [orderItemSchema], // Array embebido de productos
    shipping: {
        type: shippingSchema,
        default: null // Se completa al hacer el checkout
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } // Mapea las fechas con los nombres de tu diagrama
});

export const Order = mongoose.model("Order", orderSchema);