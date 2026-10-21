import mongoose from "mongoose";
import { MONGO_URI } from "../src/utils/config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log(`Conexión a la base de datos establecida. base "${mongoose.connection.name}"`);
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1); // Salir del proceso con un código de error
  }
}