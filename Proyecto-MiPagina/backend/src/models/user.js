import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const VUELTAS = 10;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const usuarioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true,
        minLength: [3, "El nombre necesita al menos 3 caracteres"],
        maxLength: [100, "El nombre no puede ser mayor a 100 caracteres"]
    },
    lastname: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        trim: true,
        minLength: [3, "El apellido necesita al menos 3 caracteres"],
        maxLength: [100, "El apellido no puede ser mayor a 100 caracteres"]
    },
    date: {
        type: Date,
        required: [true, "La fecha de nacimiento es obligatoria"]
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [emailRegex, "Ese email no tiene forma de email"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minLength: [6, "La contraseña necesita al menos 6 caracteres"],
        select: false
    },
    role: {
        type: String,
        trim: true,
        default: "comprador"
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            delete ret.password;
            return ret;
        }
    }
});

usuarioSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, VUELTAS);
});

usuarioSchema.methods.compararPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

export const Usuario = mongoose.model("Usuario", usuarioSchema);
