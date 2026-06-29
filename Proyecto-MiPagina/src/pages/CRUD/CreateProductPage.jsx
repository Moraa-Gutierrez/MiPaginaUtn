import React, { useState } from "react";
import usePostProduct from "../../hooks/products/usePostProduct";
import useGetProductById from "../../hooks/products/useGetProductById";
import { useNavigate } from "react-router-dom";
import "../../Css/CRUD/CreateProductPage.css"
import ProductCard from "../../components/Cards";
function CreateProductPage() {
    const [form, setForm] = useState({
        id: "preview-new", // ID temporal indispensable para el .map() de tu Card
        name: "",
        image: "",
        description: "",
        price: 0,
        quantity: 1,
        highlighted: false, // Inicializado para evitar problemas visuales
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
                highlighted: false,
            });
        }
    };

    // Objeto temporal para la vista previa que previene que la Card se vea rota sin datos
    const previewData = {
        ...form,
        name: form.name || "Nombre del producto",
        // Convierte el texto automáticamente a un formato seguro para URLs
        image: form.image || `https://placehold.co{encodeURIComponent(textoImagen)}`,
        description: form.description || "La descripción aparecerá aquí...",
    };

    return (
        <div className="admin-layout" style={{ minHeight: "100vh" }}>
            <div className="admin-main">

                <div className="admin-page-header">
                    <div>
                        <h2 className="admin-page-header__title">Nuevo producto</h2>
                        <p className="admin-page-header__sub">
                            Completá los datos para agregar un artículo al catálogo
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

                {/* CONTENEDOR PRINCIPAL DE LA GRILLA */}
                <div className="admin-grid-container">

                    {/* COLUMNA IZQUIERDA: Formulario */}
                    <div className="admin-form-card">
                        <form onSubmit={handleFormSubmit}>

                            <div className="admin-form-group">
                                <label htmlFor="name">Nombre del producto</label>
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
                                <label htmlFor="description">Descripción</label>
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
                                <label htmlFor="category_id">Categoría</label>
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
                                </select>
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
                                        placeholder="0"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label htmlFor="quantity">Stock</label>
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
                                <label htmlFor="highlighted">¿Destacar producto?</label>
                                <select
                                    name="highlighted"
                                    id="highlighted"
                                    value={form.highlighted ? "true" : "false"}
                                    onChange={handleHighlightedChange}
                                >
                                    <option value="false">No, normal</option>
                                    <option value="true">Sí, destacado ★</option>
                                </select>
                            </div>
                            {error && (
                                <p className="admin-form-error">
                                    {error?.message || String(error)}
                                </p>
                            )}

                            <div className="admin-form-actions">
                                <button className="admin-form-card" type="submit"> Crear Producto </button>
                                <button
                                    className="admin-form-card"
                                    type="button"
                                    onClick={() => setForm({ id: "preview-new", name: "", image: "", description: "", price: 0, quantity: 1 })}
                                >
                                    Borrar form
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* COLUMNA DERECHA: Vista previa */}
                    <div className="admin-preview-column">
                        <h3 className="admin-preview-title">Vista previa en tienda</h3>

                        {/* 🌟 Añadimos la línea divisoria idéntica a la de creación */}
                        <hr className="admin-preview-separator" />

                        {/* 🌟 Ahora enviamos previewData en vez de form */}
                        <ProductCard products={[previewData]} isPreview={true} />
                    </div>

                </div> {/* CIERRE DE admin-grid-container */}
            </div>
        </div>
    );
}

export default CreateProductPage;
