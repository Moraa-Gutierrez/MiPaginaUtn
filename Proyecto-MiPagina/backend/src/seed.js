import mongoose from "mongoose";
import { conectarDB } from "./db.js"; // Asegúrate de tener tu archivo de conexión o ajústalo según tu estructura
import { MONGO_URI } from "./utils/config.js"; // Ajusta la ruta según tu estructura de proyecto
import User from "./models/user.js";
import Product from "./models/product.js";
import Order from "./models/order.js";

await conectarDB();

// Se borra de afuera hacia adentro: las órdenes apuntan a usuarios y productos.
await Order.deleteMany({});
await Product.deleteMany({});
await User.deleteMany({});
console.log("🧹 Colecciones vaciadas");

// Sincronizar índices únicos (como el email de usuarios)
await User.syncIndexes();
await Product.syncIndexes();
await Order.syncIndexes();

// 1. Crear Productos con tus categorías exactas
const [bodySplash, cremaManos, perfumeHumor, velaVainilla, bandejaCemento, bustoYeso, soporteJoystick] = await Product.create([
    {
        product_name: "Natura Ekos Body Splash Maracuyá",
        price: 18500.00,
        description: "Aroma fresco y relajante para el uso diario, enriquecido con óleo esencial de maracuyá.",
        image_url: "https://images.example.com/bodysplash-maracuya.jpg",
        stock_quantity: 15,
        active: true,
        highlighted: true,
        category: { name: "Cuidados Diarios" }
    },
    {
        product_name: "Crema Hidratante para Manos Natura Tododia",
        price: 7800.00,
        description: "Nutrición prebiótica para la piel de las manos con fragancia a Nuez Pecán y Cacao.",
        image_url: "https://images.example.com/crema-manos.jpg",
        stock_quantity: 20,
        active: true,
        highlighted: false,
        category: { name: "Cuidados Diarios" }
    },
    {
        product_name: "Perfume Natura Humor Próprio 75ml",
        price: 32000.00,
        description: "Fragancia dulce y frutal con notas de cereza, ámbar y vainilla.",
        image_url: "https://images.example.com/humor-proprio.jpg",
        stock_quantity: 10,
        active: true,
        highlighted: true,
        category: { name: "Perfumes" }
    },
    {
        product_name: "Vela Aromática en Frasco de Vidrio (Vainilla & Coco)",
        price: 9500.00,
        description: "Vela artesanal de cera de soja con pabilo de madera de encendido duradero.",
        image_url: "https://images.example.com/vela-soja-vainilla.jpg",
        stock_quantity: 12,
        active: true,
        highlighted: true,
        category: { name: "Velas" }
    },
    {
        product_name: "Bandeja Macetera Ovalada de Cemento",
        price: 6500.00,
        description: "Bandeja de diseño minimalista hecha en cemento impermeabilizado para velas o accesorios.",
        image_url: "https://images.example.com/bandeja-cemento.jpg",
        stock_quantity: 8,
        active: true,
        highlighted: false,
        category: { name: "Figuras de Yeso y Cemento" }
    },
    {
        product_name: "Busto Escultura David en Yeso",
        price: 8900.00,
        description: "Figura decorativa tipo busto clásico en yeso sellado blanco matte.",
        image_url: "https://images.example.com/busto-yeso.jpg",
        stock_quantity: 6,
        active: true,
        highlighted: true,
        category: { name: "Figuras de Yeso y Cemento" }
    },
    {
        product_name: "Soporte Dual 3D para Joysticks y Auriculares",
        price: 14500.00,
        description: "Soporte organizador impreso en 3D en material biodegradable reforzado.",
        image_url: "https://images.example.com/soporte-joystick.jpg",
        stock_quantity: 10,
        active: true,
        highlighted: false,
        category: { name: "Accesorios" }
    }
]);

// 2. Crear Usuarios (incluyendo rol admin y cliente)
const [mora, camila, mateo] = await User.create([
    {
        name: "Mora",
        lastname: "Gutierrez",
        email: "mora.admin@ml.com",
        date: new Date('2001-05-14'),
        password: "$2b$10$encryptedpasswordhash1",
        active: true,
        role: "admin"
    },
    {
        name: "Camila",
        lastname: "Rios",
        email: "camila.rios@example.com",
        date: new Date('1997-08-19'),
        password: "$2b$10$encryptedpasswordhash2",
        active: true,
        role: "client"
    },
    {
        name: "Mateo",
        lastname: "Lopez",
        email: "mateo.lopez@example.com",
        date: new Date('1994-03-10'),
        password: "$2b$10$encryptedpasswordhash3",
        active: true,
        role: "client"
    }
]);

// 3. Crear Órdenes de prueba vinculando los IDs correspondientes
await Order.create([
    {
        order_number: "ORD-2026-001",
        user_id: camila._id,
        status: "confirmed",
        total_amount: 28000.00,
        items: [
            {
                product_id: bodySplash._id,
                product_name: bodySplash.product_name,
                unit_price: bodySplash.price,
                quantity: 1
            },
            {
                product_id: velaVainilla._id,
                product_name: velaVainilla.product_name,
                unit_price: velaVainilla.price,
                quantity: 1
            }
        ],
        shipping: {
            street: "Calle 61 2450",
            city: "Necochea",
            zip_code: "7630"
        }
    },
    {
        order_number: null, // Borrador / Carrito activo
        user_id: mateo._id,
        status: "draft",
        total_amount: 15400.00,
        items: [
            {
                product_id: bandejaCemento._id,
                product_name: bandejaCemento.product_name,
                unit_price: bandejaCemento.price,
                quantity: 1
            },
            {
                product_id: bustoYeso._id,
                product_name: bustoYeso.product_name,
                unit_price: bustoYeso.price,
                quantity: 1
            }
        ],
        shipping: {
            street: "Av. 2 y Calle 79",
            city: "Necochea",
            zip_code: "7630"
        }
    }
]);

console.log(`🌱 Seed completado con éxito:`);
console.log(`   - Usuarios creados: ${await User.countDocuments()}`);
console.log(`   - Productos creados: ${await Product.countDocuments()}`);
console.log(`   - Órdenes creadas: ${await Order.countDocuments()}`);

await mongoose.connection.close();