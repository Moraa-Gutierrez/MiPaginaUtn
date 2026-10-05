import React, { useState, useEffect, useCallback } from "react";
import useGetProductById from "../../hooks/products/useGetProductById";
import { useNavigate, useParams } from "react-router-dom";
import usePatchProducts from "../../hooks/products/usePatchProducts";
import ProductCard from "../../components/Cards";
import "../../Css/CRUD/EditProductPage.css";

function EditProductPage() {
    const [form, setForm] = useState({
        name: "",
        image: "",
        description: "",
        price: 0,
        quantity: 1,
        category_id: 1,
        material: "yeso",
        highlighted: false,
    });

    const { error, patchProduct } = usePatchProducts();
    const { error: getByIdError, getProductById } = useGetProductById();
    const { id } = useParams();
    const navigate = useNavigate();

    const loadProductData = useCallback(async () => {
        const response = await getProductById(id);
        if (response) {
            const { name, image, description, price, quantity, category_id, material, highlighted } = response;
            setForm({ 
                name: name || "", 
                image: image || "", 
                description: description || "", 
                price: price || 0, 
                quantity: quantity || 1,
                category_id: category_id || 1,
                material: material || "yeso",
                highlighted: highlighted || false
            });
        }
    }, [id, getProductById]);

    useEffect(() => {
        if (id) {
            loadProductData();
        }
    }, [id, loadProductData]);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const success = await patchProduct(form, id);
        if (success) {
            window.alert("¡Producto editado con éxito! ✨");
            navigate("/products");
        }
    };

    const previewData = {
        ...form,
        id: id || "preview-edit",
        name: form.name || "Nombre del producto",
        image: form.image || "https://picsum.photos/400/400",
        description: form.description || "Aquí aparecerá la descripción...",
        material: Number(form.category_id) === 5 ? (form.material || "yeso") : null
    };

    return (
        <div className="admin-layout">
            <div className="admin-main">

                <div className="admin-page-header">
                    <div>
                        <h2 className="admin-page-header__title">Editar Producto</h2>
                        <p className="admin-page-header__sub">
                            Modificá la información del artículo seleccionado en el catálogo
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

                {getByIdError && (
                    <p className="admin-form-error">
                        Error al cargar el producto: {getByIdError?.message || String(getByIdError)}
                    </p>
                )}

                <div className="admin-grid-container">

                    {/* COLUMNA IZQUIERDA: Formulario de Edición */}
                    <div className="admin-form-card">
                        <form onSubmit={handleFormSubmit} className="edit-product-form">

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
                                    placeholder="Nombre del producto..."
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
                                    <i className="fa-solid fa-align-left" style={{ color: '#b79067' }}></i> Descripción detallada
                                </label>
                                <textarea
                                    onChange={handleInputChange}
                                    value={form.description}
                                    required
                                    name="description"
                                    id="description"
                                    placeholder="Ingresá una descripción..."
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
                                    />
                                </div>
                            </div>

                            {error && (
                                <p className="admin-form-error">
                                    {error.message || String(error)}
                                </p>
                            )}

                            <div className="admin-form-actions">
                                <button type="submit" className="btn-admin-submit">
                                    <i className="fa-solid fa-floppy-disk" style={{ marginRight: '8px' }}></i> Guardar cambios
                                </button>
                                <button
                                    type="button"
                                    className="btn-admin-reset"
                                    onClick={() => navigate("/products")}
                                >
                                    Cancelar
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

export default EditProductPage;