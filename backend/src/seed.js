//La idea es crear un script independiente que se conecte a tu MongoDB, borre los datos viejos (para evitar duplicados), inserte los productos de prueba oficiales de tu tienda M&L y desconecte la base de datos de forma limpia.
// =====================================================================
//  src/utils/seed.js — Script para poblar la BD de M&L
//  Correr con: npm run seed
// =====================================================================

import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { Product } from "../models/product.model.js";
// Si ya tienes tu modelo de usuario creado, descomenta la siguiente línea:
// import { User } from "../models/user.model.js";

await connectDB();

// 1. Limpieza de colecciones de afuera hacia adentro
await Product.deleteMany({});

// if (typeof User !== 'undefined') await User.deleteMany({});
console.log("🧹 Colecciones vaciadas correctamente");

// 2. Sincronización de índices únicos (como emails o SKUs si los hubiera)
await Product.syncIndexes();
// if (typeof User !== 'undefined') await User.syncIndexes();

// 3. Creación de productos basados en tu catálogo inicial
await Product.create([
    {
        name: "Noir Extrême Perfume",
        price: 12500,
        description: "Fragancia intensa con notas orientales, cardamomo y madera de sándalo. Ideal para la noche.",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=60",
        category_id: 1, // Perfumes
        stock: 15,
        material: null
    },
    {
        name: "Collar Luna de Plata",
        price: 3200,
        description: "Collar artesanal de plata esterlina 925 con un delicado dije en forma de media luna brillante.",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=60",
        category_id: 2, // Accesorios
        stock: 10,
        material: null
    },
    {
        name: "Vela Canela y Naranja",
        price: 1800,
        description: "Vela de soja artesanal en frasco de vidrio, con un aroma cálido y estimulante de canela y cáscaras de naranja.",
        image: "https://images.unsplash.com/photo-1572726729207-a78d6fed347e?w=500&auto=format&fit=crop&q=60",
        category_id: 3, // Velas
        stock: 25,
        material: null
    },
    {
        name: "Crema Hidratante de Coco",
        price: 2400,
        description: "Loción corporal profundamente hidratante formulada con aceite de coco orgánico y manteca de karité.",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60",
        category_id: 4, // Cuidados Diarios
        stock: 12,
        material: null
    }
]);

// 4. Reporte detallado en consola (al estilo de tu ejemplo)
console.log(`🌱 Se cargaron exitosamente ${await Product.countDocuments()} productos.`);
console.log("   Categorías incluidas: Perfumes, Accesorios, Velas, Cuidados Diarios.");
console.log("   Base de datos lista para las pruebas del e-commerce M&L.");

// 5. Cierre limpio de la conexión
await mongoose.connection.close();