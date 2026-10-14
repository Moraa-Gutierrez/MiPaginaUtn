import dotenv from "dotenv";
const config = dotenv.config({quiet: true});
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mi_pagina_utn";
const PORT = process.env.PORT || 3000;

const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto_para_jwt";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "2h";

export { MONGO_URI, PORT, JWT_SECRET, JWT_EXPIRATION };