import React, { useState, useEffect, useCallback } from "react";
import useGetProductById from "../../hooks/products/useGetProductById";
import { useNavigate, useParams } from "react-router-dom";
import usePatchProducts from "../../hooks/products/usePatchProducts";
import ProductCard from "../../components/Cards";
import "../../Css/CRUD/EditProductPage.css"

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
      const previewData = {
        ...form,
        name: form.name || "Nombre del producto",
        image: form.image || "", // Si se borra la URL, ProductCard activará el bloque HTML gris
        description: form.description || "La descripción aparecerá aquí...",
    };

    return (
        <div className="admin-layout" style={{ minHeight: "100vh" }}>
            <div className="admin-main">

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
                    <p className="admin-form-error" >
                        Error al cargar el producto: {getByIdError?.message || String(getByIdError)}
                    </p>
                )}

                <div className="admin-grid-container">

                    {/* COLUMNA IZQUIERDA: Tu Formulario Original */}
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
                                <button type="submit" className="admin-form-card">
                                    Guardar cambios
                                </button>
                                <button
                                    type="button"
                                    className="admin-form-card"
                                    onClick={() => navigate("/products")}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* COLUMNA DERECHA: Vista previa */}
                    <div className="admin-preview-column">
                        <h3 className="admin-preview-title">Vista previa en tienda</h3>
                        
                        {/* 1. Agregamos la línea divisora */}
                        <hr className="admin-preview-separator" />
                        
                        {/* 2. Reemplazamos [form] por [previewData] */}
                        <ProductCard products={[previewData]} isPreview={true} />
                    </div>


                </div>
            </div>
        </div>
    );
}
export default EditProductPage