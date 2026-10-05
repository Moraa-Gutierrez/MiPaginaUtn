import React, { useState } from "react";
import usePostProduct from "../../hooks/products/usePostProduct";
import { useNavigate } from "react-router-dom";
import "../../Css/CRUD/CreateProductPage.css";
import ProductCard from "../../components/Cards";

function CreateProductPage() {
    const [form, setForm] = useState({
        id: "preview-new",
        name: "",
        image: "",
        description: "",
        price: 0,
        quantity: 1,
        category_id: 1,
        material: "yeso",
        highlighted: false,
    });

    const navigate = useNavigate();
    const { error, postProduct } = usePostProduct();

    const handleCategoryChange = (e) => {
        setForm({
            ...form,
            category_id: parseInt(e.target.value)
        });
    };

    const handleHighlightedChange = (e) => {
        setForm({
            ...form,
            highlighted: e.target.value === "true"
        });
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setForm({
            ...form,
            [name]: type === "number" ? parseInt(value) || 0 : value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const success = await postProduct(form);
        if (success) {
            window.alert("¡Producto creado con éxito! ✨");
            setForm({
                id: "preview-new",
                name: "",
                image: "",
                description: "",
                price: 0,
                quantity: 1,
                category_id: 1,
                material: "yeso",
                highlighted: false,
            });
        }
    };

    const previewData = {
        ...form,
        name: form.name || "Nombre del producto",
        image: form.image || "https://picsum.photos/400/400",
        description: form.description || "Aquí aparecerá la descripción del producto...",
        material: Number(form.category_id) === 5 ? (form.material || "yeso") : null
    };

    return (
        <div className="admin-layout">
            <div className="admin-main">

                <div className="admin-page-header">
                    <div>
                        <h2 className="admin-page-header__title">Agregar Nuevo Producto</h2>
                        <p className="admin-page-header__sub">
                            Completá los datos requeridos para publicar un nuevo artículo en la tienda
                        </p>
                    </div>
                    <button
                        className="btn-secondary-admin"
                        onClick={() => navigate("/products")}
                        type="button"
                    >
                        <i className="fa-solid fa-arrow-left"></i> Volver a la tienda
                    </button>
                </div>

                {/* GRILLA PRINCIPAL DE 2 COLUMNAS */}
                <div className="admin-grid-container">

                    {/* COLUMNA IZQUIERDA: Formulario */}
                    <div className="admin-form-card">
                        <form onSubmit={handleFormSubmit}>

                            <div className="admin-form-group">
                                <label htmlFor="name">
                                    <i className="fa-solid fa-tag" style={{ color: '#b79067' }}></i> Nombre del producto
                                </label>
                                <input
                                    onChange={handleInputChange}
                                    value={form.name}
                                    type="text"
                                    required
                                    name="name"
                                    id="name"
                                    placeholder="Ej: Perfume Noir Intense"
                                />
                            </div>

                            <div className="admin-form-group">
                                <label htmlFor="image">
                                    <i className="fa-solid fa-image" style={{ color: '#b79067' }}></i> URL de la imagen
                                </label>
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
                                <label htmlFor="description">
                                    <i className="fa-solid fa-align-left" style={{ color: '#b79067' }}></i> Descripción
                                </label>
                                <textarea
                                    onChange={handleInputChange}
                                    value={form.description}
                                    required
                                    name="description"
                                    id="description"
                                    placeholder="Describí el producto en detalle..."
                                    rows="4"
                                />
                            </div>

                            <div className="admin-form-group">
                                <label htmlFor="category_id">
                                    <i className="fa-solid fa-layer-group" style={{ color: '#b79067' }}></i> Categoría
                                </label>
                                <select
                                    name="category_id"
                                    id="category_id"
                                    value={form.category_id || 1}
                                    onChange={handleCategoryChange}
                                    required
                                >
                                    <option value={1}>Perfumes</option>
                                    <option value={2}>Accesorios</option>
                                    <option value={3}>Velas</option>
                                    <option value={4}>Cuidados Diarios</option>
                                    <option value={5}>Figuras de Yeso y Cemento</option>
                                </select>
                            </div>

                            {Number(form.category_id) === 5 && (
                                <div className="admin-form-group">
                                    <label htmlFor="material">
                                        <i className="fa-solid fa-cube" style={{ color: '#b79067' }}></i> Material de la figura
                                    </label>
                                    <select
                                        name="material"
                                        id="material"
                                        value={form.material || "yeso"}
                                        onChange={handleInputChange}
                                    >
                                        <option value="yeso">Yeso</option>
                                        <option value="cemento">Cemento</option>
                                        <option value="resina">Resina</option>
                                    </select>
                                </div>
                            )}

                            <div className="admin-form-row">
                                <div className="admin-form-group">
                                    <label htmlFor="price">
                                        <i className="fa-solid fa-dollar-sign" style={{ color: '#b79067' }}></i> Precio ($)
                                    </label>
                                    <input
                                        onChange={handleInputChange}
                                        value={form.price}
                                        type="number"
                                        required
                                        name="price"
                                        id="price"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label htmlFor="quantity">
                                        <i className="fa-solid fa-boxes-stacked" style={{ color: '#b79067' }}></i> Stock disponible
                                    </label>
                                    <input
                                        onChange={handleInputChange}
                                        value={form.quantity}
                                        type="number"
                                        required
                                        name="quantity"
                                        id="quantity"
                                        placeholder="1"
                                    />
                                </div>
                            </div>

                            <div className="admin-form-group">
                                <label htmlFor="highlighted">
                                    <i className="fa-solid fa-star" style={{ color: '#b79067' }}></i> ¿Destacar producto?
                                </label>
                                <select
                                    name="highlighted"
                                    id="highlighted"
                                    value={form.highlighted ? "true" : "false"}
                                    onChange={handleHighlightedChange}
                                >
                                    <option value="false">No, catálogo normal</option>
                                    <option value="true">Sí, producto destacado ★</option>
                                </select>
                            </div>

                            {error && (
                                <p className="admin-form-error">
                                    {error?.message || String(error)}
                                </p>
                            )}

                            <div className="admin-form-actions">
                                <button className="btn-admin-submit" type="submit">
                                    <i className="fa-solid fa-plus" style={{ marginRight: '8px' }}></i> Crear Producto
                                </button>
                                <button
                                    className="btn-admin-reset"
                                    type="button"
                                    onClick={() => setForm({ 
                                        id: "preview-new", 
                                        name: "", 
                                        image: "", 
                                        description: "", 
                                        price: 0, 
                                        quantity: 1,
                                        category_id: 1,
                                        material: "yeso",
                                        highlighted: false
                                    })}
                                >
                                    Limpiar
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* COLUMNA DERECHA: Vista Previa Fija */}
                    <div className="admin-preview-column">
                        <div className="admin-preview-header">
                            <h3 className="admin-preview-title">
                                <i className="fa-regular fa-eye" style={{ color: '#b79067' }}></i> Vista previa en tienda
                            </h3>
                        </div>
                        <div className="admin-preview-card-wrapper">
                            <ProductCard products={[previewData]} isPreview={true} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CreateProductPage;
