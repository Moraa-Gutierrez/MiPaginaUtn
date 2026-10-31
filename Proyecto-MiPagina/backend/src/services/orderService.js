import {Product} from "../models/product.js";
import {Usuario} from "../models/user.js";
import {ErrorApp} from "../utils/ErrorApp.js";
import { Order } from "../models/order.js";

// 1. Get or create the active cart (order with status 'draft') for a user
export const getOrCreateCartService = async (userId) => {
    let cart = await Order.findOne({ user_id: userId, status: "draft" }).populate(
        "items.product_id",
        "name price quantity active"
    );

    if (!cart) {
        cart = await Order.create({
            user_id: userId,
            status: "draft",
            items: [],
            total_amount: 0
        });
    }

    return cart;
};

// 2. Add item to cart (draft order)
export const addToCartService = async (usuarioId, productId, quantity) => {
    // Verify product exists and is active
    const product = await Product.findById(productId);
    if (!product || !product.active) {
        throw new ErrorApp("Product not found or inactive", 404);
    }

    if (product.quantity < quantity) {
        throw new ErrorApp(`Insufficient stock. Only ${product.quantity} available.`, 400);
    }

    let cart = await getOrCreateCartService(usuarioId);

    // Check if the product is already in the cart items array
    const itemIndex = cart.items.findIndex((item) => {
    const idEnCart = item.product_id._id ? item.product_id._id.toString() : item.product_id.toString();
    return idEnCart === productId;
});

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        // Snapshot of product details at the moment of adding
        cart.items.push({
            product_id: product._id,
            product_name: product.name,
            unit_price: product.price,
            quantity: quantity
        });
    }

    // Recalculate total amount securely on server
    cart.total_amount = cart.items.reduce(
        (acc, item) => acc + item.unit_price * item.quantity, 
        0
    );

    await cart.save();
    return cart;
};

// 3. Remove an item from the cart
export const removeFromCartService = async (userId, productId) => {
    const cart = await Order.findOne({ user_id: userId, status: "draft" });

    if (!cart) {
        throw new ErrorApp("Active cart not found", 404);
    }

    cart.items = cart.items.filter(
        (item) => item.product_id.toString() !== productId
    );

    cart.total_amount = cart.items.reduce(
        (acc, item) => acc + item.unit_price * item.quantity, 
        0
    );

    await cart.save();
    return cart;
};

// 4. Checkout / Confirm order with atomic stock reduction and rollback (inspired by teacher's best practices)
export const checkoutOrderService = async (userId, shippingData) => {
    const cart = await Order.findOne({ user_id: userId, status: "draft" });

    if (!cart || cart.items.length === 0) {
        throw new ErrorApp("Cannot checkout an empty cart", 400);
    }

    const discountedItems = [];

    try {
        // Atomic stock reduction to prevent race conditions
        for (const item of cart.items) {
            const updatedProduct = await Product.findOneAndUpdate(
                {
                    _id: item.product_id,
                    active: true,
                    quantity: { $gte: item.quantity }
                },
                { $inc: { quantity: -item.quantity } },
                { returnDocument: "after" }
            );

            if (!updatedProduct) {
                throw new ErrorApp(`Insufficient stock for product "${item.product_name}"`, 409);
            }
            discountedItems.push(item);
        }

        // Generate formal order number
        const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // Update draft cart to confirmed order
        cart.status = "confirmed";
        cart.order_number = orderNumber;
        cart.shipping = shippingData;

        // Recalculate total safely on server
        cart.total_amount = cart.items.reduce(
            (acc, item) => acc + item.unit_price * item.quantity, 
            0
        );

        await cart.save();
        return cart;

    } catch (error) {
        // Rollback: restore stock if any error occurred during checkout
        for (const item of discountedItems) {
            await Product.updateOne(
                { _id: item.product_id },
                { $inc: { quantity: item.quantity } }
            );
        }
        throw error;
    }
};

// 5. Get all orders for a specific user (purchase history)
export const getUserOrdersService = async (userId) => {
    return await Order.find({ user_id: userId, status: { $ne: "draft" } }).sort({ createdAt: -1 });
};

// 6. Get all orders for administration panel (sorted by date)
export const getAllOrdersService = async () => {
    return await Order.find()
        .populate("user_id", "name lastname email")
        .sort({ created_at: -1, createdAt: -1 });
};

// 7. Update order status dynamically
export const updateOrderStatusService = async (orderId, status) => {
    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { returnDocument: "after", runValidators: true }
    ).populate("user_id", "name lastname email");

    if (!updatedOrder) {
        throw new ErrorApp(`Orden con ID ${orderId} no encontrada`, 404);
    }

    return updatedOrder;
};