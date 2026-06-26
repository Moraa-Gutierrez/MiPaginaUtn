import React, { useState, useEffect, useCallback } from "react";
import useGetProductById from "../../hooks/products/useGetProductById";
import { useNavigate, useParams } from "react-router-dom";
import usePatchProducts from "../../hooks/products/usePatchProducts";

function EditProductPage() {
    const [form, setForm] = useState({
        name: "",
        image: "",
        description: "",
        price: 0,
        quantity: 1,
    });

    const { error, patchProduct } = usePatchProducts();
    const { error: getByIdError, getProductById } = useGetProductById();
    const { id } = useParams();
    const navigate = useNavigate();

    const loadProductData = useCallback(async () => {

        const response = await getProductById(id);

        if (response) {

            const { name, image, description, price, quantity } = response;

            setForm({ name, image, description, price, quantity });

        }

    }, [id]);

    useEffect(() => {

        if (id) {

            loadProductData();

        } else {
            console.log("No se detectó ningún ID en los parámetros de la URL:", { id });
        }
    }, [id]);
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setForm({
            ...form,
            [name]: type === "number" ? parseInt(value) || 0 : value,
        });
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Esperamos la respuesta real del servidor con el await
        const success = await patchProduct(form, id);

        if (success) {
            window.alert("¡Producto editado con éxito!✨✨");
            setForm({ name: "", image: "", description: "", price: 0, quantity: 1 });
            navigate("/products");
        }
    };
    return (
        <div className="admin-layout" style={{ minHeight: "100vh" }}>
            <div className="admin-main">
 
                {/* Header */}
                <div className="admin-page-header">
                    <div>
                        <h2 className="admin-page-header__title">Editar producto</h2>
                        <p className="admin-page-header__sub">
                            Modificá los detalles del artículo seleccionado
                        </p>
                    </div>
                    <button
                        className="btn-secondary"
                        onClick={() => navigate("/products")}
                        type="button"
                    >
                        ← Volver a la tienda
                    </button>
                </div>
 
                {getByIdError && (
                    <p className="admin-form-error" style={{ marginBottom: "1rem" }}>
                        Error al cargar el producto: {getByIdError?.message || String(getByIdError)}
                    </p>
                )}
 
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "start" }}>
 
           
                    <div className="admin-form-card">
                        <form onSubmit={handleFormSubmit} className="edit-product-form">
 
                            <div className="admin-form-group">
                                <label htmlFor="name">Nombre del producto</label>
                                <input
                                    onChange={handleInputChange}
                                    value={form.name}
                                    type="text"
                                    required
                                    name="name"
                                    id="name"
                                    placeholder="Nombre del producto..."
                                />
                            </div>
 
                            <div className="admin-form-group">
                                <label htmlFor="image">URL de la imagen</label>
                                <input
                                    onChange={handleInputChange}
                                    value={form.image}
                                    type="text"
                                    required
                                    name="image"
                                    id="image"
                                    placeholder="https://..."
                                />
                            </div>
 
                            <div className="admin-form-group">
                                <label htmlFor="description">Descripción detallada</label>
                                <textarea
                                    onChange={handleInputChange}
                                    value={form.description}
                                    required
                                    name="description"
                                    id="description"
                                    placeholder="Ingresá una descripción del producto..."
                                    rows="4"
                                />
                            </div>
 
                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label htmlFor="price">Precio ($)</label>
                                    <input
                                        onChange={handleInputChange}
                                        value={form.price}
                                        type="number"
                                        required
                                        name="price"
                                        id="price"
                                        placeholder="$$$"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label htmlFor="quantity">Stock disponible</label>
                                    <input
                                        onChange={handleInputChange}
                                        value={form.quantity}
                                        type="number"
                                        required
                                        name="quantity"
                                        id="quantity"
                                    />
                                </div>
                            </div>
 
                            {error && (
                                <p className="admin-form-error">
                                    {error.message || error}
                                </p>
                            )}
 
                            <div className="admin-form-actions">
                                <button type="submit" className="btn-primary">
                                    Guardar cambios
                                </button>
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => navigate("/products")}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
 
                    {/* Vista previa en tiempo real */}
                    <div className="admin-preview-card">
                        <h3>Vista previa en tienda</h3>
                        {form.image ? (
                            <img
                                className="admin-preview-img"
                                src={form.image}
                                alt="Preview"
                            />
                        ) : (
                            <div className="admin-preview-no-img">Sin imagen seleccionada</div>
                        )}
                        <p className="admin-preview-name">
                            {form.name || "Nombre del Producto"}
                        </p>
                        <p className="admin-preview-desc">
                            {form.description || "Aquí aparecerá la descripción..."}
                        </p>
                        <div className="admin-preview-meta">
                            <span className="admin-preview-price">
                                ${Number(form.price).toLocaleString("es-AR")}
                            </span>
                            <span className="admin-preview-stock">
                                {form.quantity} unidades
                            </span>
                        </div>
                    </div>
 
                </div>
            </div>
        </div>
    );
}
export default EditProductPage