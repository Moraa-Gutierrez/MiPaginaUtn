import swaggerJSDoc from "swagger-jsdoc";
import {PORT} from"../utils/config.js";
const definicion = {
    openapi: "3.0.0",
    info: {
        title: "Api M&L Beauty",
        version: "1.0.0",
        description: "Documentación de la API de M&L Beauty",   
        contact: {
            name: "M&L Beauty"
        },
        servers: [
            {
                url: `http://localhost:${PORT}`, description: "Servidor local"},
        ],
        tags: [
            {
                name: "Productos",description: "Catalogo de productos de M&L organizado por categorias "},
            {
                name: "Usuarios",description: "Administración de usuarios y roles"},
            {
                name: "Pedidos",description: "Administración de pedidos y estados de los mismos"},
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                     description: "Pegá acá el token que devuelve POST /api/auth/login",
                }
         }
         },
         schemas: {
            Product: {
                type: "object",
                properties: {
                     error: { type: "string", example: "Ese id no tiene un formato válido" },
             } 
            },
            ErrorDeValidacion: {
                type: "object",
                properties: {
                    error: { type: "string", example: "Los datos no son válidos" },
                    detalles: {
                        type: "array",
                        items: { type: "string" },
                        example: ["El campo 'name' es obligatorio", "El campo 'price' debe ser un número positivo"]
                    },
                },
            },
            Producto: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "68f1a2b3c4d5e6f701234568" },
                        nombre: { type: "string", example: "Body Splash Corporal Tododia" },
                        marca: { type: "string", example: "Natura" },
                        descripcion: { type: "string", example: "Fragancia refrescante con notas florales." },
                        precio: { type: "number", example: 12500 },
                        stock: { type: "integer", example: 15 },
                        disponible: { type: "boolean", example: true },
                        imagen: {
                            type: "string",
                            nullable: true,
                            example: "http://localhost:3000/uploads/body-splash-natura.png",
                            description: "URL de la imagen del producto",
                        },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                        __v: { type: "integer", example: 0 },
                    },
                },
                ProductoNuevo: {
                    type: "object",
                    required: ["nombre", "precio"],
                    properties: {
                        nombre: { type: "string", minLength: 2, example: "Body Splash Frutas Rojas" },
                        marca: { type: "string", example: "Natura" },
                        descripcion: { type: "string", example: "Edición limitada" },
                        precio: { type: "number", minimum: 0, example: 12500 },
                        stock: { type: "integer", minimum: 0, default: 0, example: 10 },
                    },
                },

                // ── USUARIO Y AUTENTICACIÓN ─────────────────────────────
                Usuario: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "68f1a2b3c4d5e6f70123456a" },
                        nombre: { type: "string", example: "Mora" },
                        apellido: { type: "string", example: "Gutierrez" },
                        email: { type: "string", format: "email", example: "mora@mail.com" },
                        rol: { type: "string", enum: ["comprador", "vendedor", "admin"], example: "comprador" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                        __v: { type: "integer", example: 0 },
                    },
                },
                Registro: {
                    type: "object",
                    required: ["nombre", "apellido", "email", "password"],
                    properties: {
                        nombre: { type: "string", minLength: 3, example: "Mora" },
                        apellido: { type: "string", minLength: 3, example: "Gutierrez" },
                        email: { type: "string", format: "email", example: "mora@mail.com" },
                        password: { type: "string", format: "password", minLength: 6, example: "mora1234" },
                    },
                },
                Login: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: { type: "string", format: "email", example: "mora@mail.com" },
                        password: { type: "string", format: "password", example: "mora1234" },
                    },
                },
                Sesion: {
                    type: "object",
                    properties: {
                        usuario: { $ref: "#/components/schemas/Usuario" },
                        token: {
                            type: "string",
                            description: "El JWT. Va en el header Authorization: Bearer <token>",
                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        },
                    },
                },

                // ── ORDEN / CARRITO (ARQUITECTURA DE BORRADOR) ───────────
                ItemDeOrden: {
                    type: "object",
                    properties: {
                        producto: { type: "string", example: "68f1a2b3c4d5e6f701234568" },
                        cantidad: { type: "integer", example: 2 },
                        precioUnitario: { type: "number", example: 12500, description: "Precio al momento de la compra" },
                        subtotal: { type: "number", example: 25000 },
                    },
                },
                Orden: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "68f1a2b3c4d5e6f70123456c" },
                        usuario: { type: "string", example: "68f1a2b3c4d5e6f70123456a" },
                        items: { type: "array", items: { $ref: "#/components/schemas/ItemDeOrden" } },
                        total: { type: "number", example: 25000 },
                        status: { type: "string", enum: ["draft", "completed", "cancelled"], example: "draft", description: "Draft representa el carrito actual" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                        __v: { type: "integer", example: 0 },
                    },
                },
                ItemNuevoDeOrden: {
                    type: "object",
                    required: ["productId", "quantity"],
                    properties: {
                        productId: { type: "string", example: "68f1a2b3c4d5e6f701234568" },
                        quantity: { type: "integer", minimum: 1, example: 2 },
                    },
                },
            },
        },
    }
export const especificacion= swaggerJSDoc({
    definition: definicion,
    apis: ["./src/routes/*.js"],
});