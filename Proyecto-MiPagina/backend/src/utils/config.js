import dotenv from "dotenv";
const config = dotenv.config({quiet: true});
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/M&L";
const PORT = process.env.PORT || 3000;

const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto_para_jwt";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "2h";

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY

const API_URL = process.env.API_URL || `http://localhost:${PORT}`

const STORAGE = process.env.STORAGE || "local"
const CARPETA_IMAGENES = process.env.CARPETA_IMAGENES || "uploads"
export { MONGO_URI, PORT, JWT_SECRET, JWT_EXPIRATION, SUPABASE_URL, SUPABASE_KEY, API_URL, STORAGE, CARPETA_IMAGENES };