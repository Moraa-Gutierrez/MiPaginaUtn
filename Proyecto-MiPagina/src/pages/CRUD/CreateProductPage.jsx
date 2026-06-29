import React, { useState } from "react";
import usePostProduct from "../../hooks/products/usePostProduct";
import { useNavigate } from "react-router-dom";
import "../../Css/CRUD/CreateProductPage.css"
import ProductCard from "../../components/Cards";

function CreateProductPage() {
    // Esta es la forma de tener un estado por defecto para un objeto
    // Esto se suele hacer cuando tenes mas de dos campos relacionados
    const [form, setForm] = useState({
        name: "",
        image: "",
        description: "",
        price: 0,
        quantity: 1,
    });
    // Permite la redireccion dentro del sistema de react
    const navigate = useNavigate()

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
    // Esto resuelve un problema, como yo tengo un objeto, como sabe react cual de todos los campos de mi formulario disparo el evento del cambio?
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setForm({
            // ... este spread operator evita que se sobreescriban los campos no editados, solo se cambia el que modificaste, el resto queda igual
            ...form,
            // Considera el nombre del input y el tipo del input
            // si el input es numerico entonces convierte el valor a numero entero
            // si llego vacio el value entonces le ponemos 0
            // si el input no es numerico, entonces queda el valor original
            [name]: type === "number" ? parseInt(value) || 0 : value,
        });
        console.log(form);
    };

    const handleFormSubmit = async (e) => {
        // Evita que la pagina refresque al enviar el formulario
        e.preventDefault()

        const success = await postProduct(form)
        if (success) {
            // Limpiamos el form
            setForm({
                name: "",
                image: "",
                description: "",
                price: 0,
                quantity: 1,
            })
            //   navigate("/products")
        }

    }
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

                    {/* Grilla en dos columnas */}
                    <div className="admin-grid-container">

                        {/* COLUMNA IZQUIERDA: Tu Formulario Original */}
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

                                {error && (
                                    <p className="admin-form-error">
                                        {error?.message || String(error)}
                                    </p>
                                )}

                                <div className="admin-form-actions">
                                    <button className="btn-secondary" type="submit"> Crear Producto </button>
                                    <button className="btn-secondary" type="reset"> Borrar form </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* COLUMNA DERECHA: Vista previa */}
                    <div className="admin-preview-column">
                        <h3 className="admin-preview-title">Vista previa en tienda</h3>
                        <ProductCard products={[form]} isPreview={true} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default CreateProductPage;
