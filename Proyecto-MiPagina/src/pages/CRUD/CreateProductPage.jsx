import React, { useState } from "react";
import usePostProduct from "../../hooks/products/usePostProduct";
import { useNavigate } from "react-router-dom";

function CreateProductPage() {
    const [form, setForm] = useState({
        name: "",
        image: "",
        description: "",
        category_id: 1,
        price: 0,
        quantity: 1,
        highlighted: false,
    });
    //para navegar dentro de React
    const navigate = useNavigate();
    const { error, postProduct } = usePostProduct()

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "number" ? parseInt(value) || 0 : value,
        });
    };

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
    const handleFormSubmit = async (e) => {
        // Evita que la pagina refresque al enviar el formulario
        e.preventDefault()

        console.log("Formulario enviado con exito", form);

        const success = await postProduct(form)
        if (success) {
            window.alert("¡Producto creado con exito!")
   
            setForm({
                name: "",
                image: "",
                description: "",
                price: 0,
                category_id: 1,
                quantity: 1,
                highlighted: false,
            })
            navigate("/products")
        }

    };
    return (
        <>
            <h1>Ingrese el nuevo producto</h1>
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

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "start" }}>


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
                                    />
                                </div>

                                <div className="admin-form-group">
                                    <label htmlFor="category_id">Categoría</label>
                                    <select
                                        onChange={handleCategoryChange}
                                        value={form.category_id}
                                        required
                                        name="category_id"
                                        id="category_id"
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
                                    <label htmlFor="highlighted">¿Es producto destacado?</label>
                                    <select
                                        onChange={handleHighlightedChange}
                                        value={form.highlighted ? "true" : "false"}
                                        name="highlighted"
                                        id="highlighted"
                                        required
                                    >
                                        <option value="false">No — producto común</option>
                                        <option value="true">Sí — producto destacado ★</option>
                                    </select>
                                </div>

                                {error && (
                                    <p className="admin-form-error">
                                        {error?.message || String(error)}
                                    </p>
                                )}

                                <div className="admin-form-actions">
                                    <button type="submit" className="btn-primary">
                                        Guardar producto
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-secondary"
                                        onClick={() => setForm(INITIAL_FORM)}
                                    >
                                        Limpiar
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Vista previa */}
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
                                {form.name || "Nombre del producto"}
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
                            {form.highlighted && (
                                <span
                                    className="admin-badge highlight"
                                    style={{ marginTop: "12px", display: "inline-flex" }}
                                >
                                    ★ Destacado
                                </span>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
export default CreateProductPage;