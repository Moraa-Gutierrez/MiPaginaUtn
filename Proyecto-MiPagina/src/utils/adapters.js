const FALLBACK_IMAGE =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120">
            <rect width="100%" height="100%" fill="#f8f9fa"/>
            <text x="50%" y="55%" font-size="36" text-anchor="middle" dominant-baseline="middle">✨ M&L</text>
        </svg>`
    )

// Backend product -> Frontend product
export const productAdapter = (item) => ({
    id: item._id,
    name: item.name || item.titulo,
    description: [item.category || item.categoria, item.material].filter(Boolean).join(" · "),
    price: item.price || item.precio,
    quantity: item.stock || item.quantity,
    image: item.image || item.imagen || FALLBACK_IMAGE,
    highlighted: item.highlighted || false,
    available: item.available !== undefined ? item.available : item.disponible,
})

// Frontend form -> Backend product (for POST and PATCH)
export const formToProductPayload = (form) => {
    const payload = {
        titulo: form.name,
        precio: Number(form.price),
        stock: Number(form.quantity),
    }
    if (form.category) payload.categoria = form.category
    if (form.description) payload.descripcion = form.description
    if (form.material) payload.material = form.material
    if (form.available !== undefined) payload.disponible = form.available

    return payload
}

// Frontend form -> FormData (when uploading product images)
export const productToFormData = (form) => {
    const productData = formToProductPayload(form)
    const formData = new FormData()

    for (const [key, value] of Object.entries(productData)) {
        if (value !== undefined && value !== null && value !== "") {
            formData.append(key, value)
        }
    }

    if (form.image instanceof File) {
        formData.append("imagen", form.image)
    }

    return formData
}

// Backend product -> Edit form fields
export const productToFormValues = (product) => ({
    name: product.titulo || product.name || "",
    category: product.categoria || product.category || "",
    price: product.precio ?? product.price ?? 0,
    quantity: product.stock ?? product.quantity ?? 0,
    material: product.material || "",
    available: product.disponible ?? product.available ?? true,
    image: null,
    currentImage: product.imagen || product.image || null,
})

// Backend cart -> Cart view
export const cartViewAdapter = (cart) => ({
    items: (cart?.items ?? []).map((cartItem) => ({
        product: productAdapter(cartItem.product || cartItem.libro),
        quantity: cartItem.quantity || cartItem.cantidad,
        subtotal: cartItem.subtotal,
    })),
    units: cart?.units || cart?.unidades || 0,
    total: cart?.total || 0,
})

// Backend order -> Order view
export const orderViewAdapter = (order) => ({
    id: order._id,
    date: new Date(order.createdAt).toLocaleString("es-AR"),
    status: order.estado || order.status,
    total: order.total,
    lines: (order.items ?? []).map((line) => ({
        productId: line.product || line.libro,
        title: line.title || line.titulo,
        unitPrice: line.unitPrice || line.precioUnitario,
        quantity: line.quantity || line.cantidad,
        subtotal: line.subtotal,
    })),
    buyer: order.user?.name || order.usuario?.nombre
        ? `${order.user?.name || order.usuario?.nombre} ${order.user?.lastName || order.usuario?.apellido || ""}`.trim()
        : null,
})

// Backend user -> Frontend user (AuthContext reads user.role)
export const userAdapter = (usuario, token) => ({
    id: usuario._id ?? usuario.id,
    name: usuario.name ?? usuario.nombre,
    lastName: usuario.lastName ?? usuario.apellido ?? usuario.lastname,
    email: usuario.email,
    role: usuario.role ?? usuario.rol,
    token,
})

export const leerSesion = (data) => {
    const usuario = data.usuario ?? data.user ?? data
    const token = data.token ?? data.accessToken
    return userAdapter(usuario, token)
}

export const leerError = async (response, porDefecto) => {
    try {
        const data = await response.json()
        const detalles = Array.isArray(data.detalles) ? `: ${data.detalles.join(" · ")}` : ""
        return (data.error ?? data.message ?? porDefecto) + detalles
    } catch {
        return porDefecto
    }
}