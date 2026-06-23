import React, { useState } from "react";
import useGetProductById from "../../hooks/products/useGetProductById";
import { useNavigate, useParams } from "react-router-dom";
import useGetProducts from "../../hooks/products/useGetProduct";
import React from 'react'

function EditProductPage() {
    const [form, setForm] = useState({
        name: "",
        image: "",
        description: "",
        price: 0,
        quantity: 1,
    });

    const { error, patchProduct } = usePatchProduct();
    const { error: getByIdError, getProductById } = useGetProductById();
    const { id } = useParams();
    const navigate = useNavigate();

    const loadProductData = async () => {
        const response = await getProductById(id);

        if (response) {
            // Destructuracion de respuesta del servidor: destructure el obj directamente
            const { name, image, description, price, quantity } = response;
            setForm({ name, image, description, price, quantity });
        }
    };
    //separe el useEffect, saque la funcion loadProduct
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
        <div className="edit-product-container">
            <header className="edit-product-header">
                <h1>Panel de Edición</h1>
                <p className="subtitle">Modificá los detalles del artículo seleccionado</p>
                <div className="linea-decorativa"></div>
            </header>

            <div className="edit-product-grid">

                {/* COLUMNA 1: Formulario Controlado */}
                <form onSubmit={handleFormSubmit} className="edit-product-form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre del Producto</label>
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

                    <div className="form-group">
                        <label htmlFor="image">URL de la Imagen</label>
                        <input
                            onChange={handleInputChange}
                            value={form.image}
                            type="text"
                            required
                            name="image"
                            id="image"
                            placeholder=""
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Descripción Detallada</label>
                        <textarea
                            onChange={handleInputChange}
                            value={form.description}
                            required
                            name="description"
                            id="description"
                            placeholder="Ingrese una descripcion del producto..."
                            rows="4"
                          
                        ></textarea>
                    </div>

                    <div className="form-row-doble">
                        <div className="form-group">
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

                        <div className="form-group">
                            <label htmlFor="quantity">Stock Disponible</label>
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

                    <button type="submit" className="btn-guardar-cambios">
                        Guardar Cambios
                    </button>

                    {error && <p className="error-message-live">{error.message || error}</p>}
                </form>

                {/* COLUMNA 2: Vista previa interactiva */}
                <aside className="product-preview-card">
                    <h3>Vista Previa en Tienda</h3>
                    <div className="preview-box">
                        <div className="preview-image-wrapper">
                            {form.image ? (
                                <img src={form.image} alt="Preview" className="img-real-preview" />
                            ) : (
                                <div className="no-image-placeholder">Sin imagen seleccionada</div>
                            )}
                        </div>
                        <div className="preview-info">
                            <h4 className="preview-title">{form.name || "Nombre del Producto"}</h4>
                            <p className="preview-desc">{form.description || "Aquí aparecerá la descripción..."}</p>
                            <div className="preview-meta">
                                <span className="preview-price">${form.price}</span>
                                <span className="preview-stock">{form.quantity} unidades</span>
                            </div>
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
}
export default EditProductPage