import { API_URL } from "../config"
import { leerError } from "./adapters"

const SESSION_KEY = "usuario"

export function leerToken() {
    try {
        const storedUser = sessionStorage.getItem(SESSION_KEY)
        if (storedUser) {
            const parsed = JSON.parse(storedUser)
            if (parsed?.token) return parsed.token
        }
    } catch {
        // Fallback si no es JSON válido
    }
    return sessionStorage.getItem("token") || localStorage.getItem("token") || null
}

export class ApiError extends Error {
    constructor(mensaje, status) {
        super(mensaje)
        this.name = "ApiError"
        this.status = status
    }
}

export async function api(metodo, ruta, opciones = {}) {
    const token = leerToken()

    let bodyData = undefined
    let porDefecto = "Error connecting to the server"

    if (opciones) {
        if ("porDefecto" in opciones) {
            porDefecto = opciones.porDefecto
        }

        if ("body" in opciones) {
            bodyData = opciones.body
        } else {
            const { porDefecto: _, ...rest } = opciones
            if (Object.keys(rest).length > 0) {
                bodyData = rest
            }
        }
    }

    const esArchivo = bodyData instanceof FormData
    const tieneBody = bodyData !== undefined && metodo !== "GET" && metodo !== "HEAD"

    const response = await fetch(`${API_URL}${ruta}`, {
        method: metodo,
        headers: {
            ...(tieneBody && !esArchivo ? { "Content-Type": "application/json" } : {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: tieneBody ? (esArchivo ? bodyData : typeof bodyData === "string" ? bodyData : JSON.stringify(bodyData)) : undefined,
    })

    if (!response.ok) {
        throw new ApiError(await leerError(response, porDefecto), response.status)
    }

    if (response.status === 204) return null

    return await response.json()
}