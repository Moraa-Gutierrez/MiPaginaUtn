import { API_URL } from "../config"
import { leerError } from "./adapters"

const SESSION_KEY = "usuario"

export function leerToken() {
    try {
        return JSON.parse(sessionStorage.getItem(SESSION_KEY))?.token ?? null
    } catch {
        return null
    }
}

export class ApiError extends Error {
    constructor(mensaje, status) {
        super(mensaje)
        this.name = "ApiError"
        this.status = status
    }
}

export async function api(metodo, ruta, { body, porDefecto = "Error connecting to the server" } = {}) {
    const token = leerToken()
    const esArchivo = body instanceof FormData

    const response = await fetch(`${API_URL}${ruta}`, {
        method: metodo,
        headers: {
            ...(body !== undefined && !esArchivo ? { "Content-Type": "application/json" } : {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body === undefined ? undefined : esArchivo ? body : JSON.stringify(body),
    })

    if (!response.ok) {
        throw new ApiError(await leerError(response, porDefecto), response.status)
    }

    if (response.status === 204) return null

    return await response.json()
}
