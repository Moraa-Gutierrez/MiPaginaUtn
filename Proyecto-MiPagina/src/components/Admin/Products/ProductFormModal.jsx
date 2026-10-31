import React, { useState, useEffect } from 'react';
import '../../../Css/Admin/ProductManagement.css';

const CATEGORIES = [
    { id: 1, name: "Perfumes" },
    { id: 2, name: "Accesorios" },
    { id: 3, name: "Velas" },
    { id: 4, name: "Cuidados Diarios" },
    { id: 5, name: "Figuras de Yeso y Cemento" }
];

function ProductFormModal({ isOpen, onClose, onSubmit, initialProduct, submitting }) {
    const isEditing = Boolean(initialProduct);

    const [form, setForm] = useState({
        name: "",
        description: "",
        category_id: 1,
        material: "yeso",
        price: "",
        quantity: "1",
        highlighted: false,
        active: true,
        image: ""
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [useUrlInput, setUseUrlInput] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    // Cargar datos al abrir o cambiar de producto
    useEffect(() => {
        if (initialProduct) {
            setForm({
                name: initialProduct.name || "",
                description: initialProduct.description || "",
                category_id: Number(initialProduct.category_id) || 1,
                material: initialProduct.material || "yeso",
                price: initialProduct.price !== undefined ? String(initialProduct.price) : "",
                quantity: initialProduct.quantity !== undefined ? String(initialProduct.quantity) : "1",
                highlighted: Boolean(initialProduct.highlighted),
                active: initialProduct.active !== undefined ? Boolean(initialProduct.active) : true,
                image: initialProduct.image || ""
            });
            setImagePreview(initialProduct.image || "");
            setImageFile(null);
            setUseUrlInput(false);
        } else {
            setForm({
                name: "",
                description: "",
                category_id: 1,
                material: "yeso",
                price: "",
                quantity: "1",
                highlighted: false,
                active: true,
                image: ""
            });
            setImageFile(null);
            setImagePreview("");
            setUseUrlInput(false);
        }
        setFormErrors({});
    }, [initialProduct, isOpen]);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

        // Limpiar error del campo
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleCategoryChange = (e) => {
        const selectedCat = Number(e.target.value);
        setForm(prev => ({
            ...prev,
            category_id: selectedCat,
            // Si cambia a una categoría que no es 5, limpiamos material
            material: selectedCat === 5 ? (prev.material || "yeso") : null
        }));
    };

    const handleMaterialChange = (selectedMaterial) => {
        setForm(prev => ({
            ...prev,
            material: selectedMaterial
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                setFormErrors(prev => ({ ...prev, image: "El archivo seleccionado debe ser una imagen válida." }));
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setFormErrors(prev => ({ ...prev, image: "La imagen no debe superar los 5MB." }));
                return;
            }

            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            setFormErrors(prev => ({ ...prev, image: null }));
        }
    };

    const handleRemoveSelectedImage = () => {
        setImageFile(null);
        setImagePreview("");
        setForm(prev => ({ ...prev, image: "" }));
    };

    const validateForm = () => {
        const errors = {};
        if (!form.name.trim() || form.name.trim().length < 3) {
            errors.name = "El nombre del producto es obligatorio (mínimo 3 caracteres).";
        }
        if (!form.description.trim()) {
            errors.description = "La descripción del producto es obligatoria.";
        }
        if (form.price === "" || Number(form.price) < 0) {
            errors.price = "El precio debe ser un número válido mayor o igual a 0.";
        }
        if (form.quantity === "" || Number(form.quantity) < 0) {
            errors.quantity = "El stock debe ser un número válido mayor o igual a 0.";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Construir FormData compatible con multipart/form-data
        const formData = new FormData();
        formData.append("name", form.name.trim());
        formData.append("description", form.description.trim());
        formData.append("category_id", String(form.category_id));
        formData.append("price", String(form.price));
        formData.append("quantity", String(form.quantity));
        formData.append("highlighted", String(form.highlighted));
        formData.append("active", String(form.active));

        if (Number(form.category_id) === 5 && form.material) {
            formData.append("material", form.material);
        }

        if (imageFile) {
            formData.append("image", imageFile);
        } else if (form.image) {
            formData.append("image", form.image);
        }

        const res = await onSubmit(formData);
        if (res?.success) {
            onClose();
        }
    };

    const isCategoryFigures = Number(form.category_id) === 5;

    return (
        <div className="admin-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
            <div className="admin-modal-dialog large" onClick={e => e.stopPropagation()}>
                
                {/* Cabecera del Modal */}
                <div className="admin-modal-header">
                    <h2 className="admin-modal-title">
                        <i className={isEditing ? "fa-solid fa-pen-to-square" : "fa-solid fa-box-open"}></i>
                        {isEditing ? `Editar Producto: ${initialProduct.name}` : "Agregar Nuevo Producto"}
                    </h2>
                    <button 
                        type="button" 
                        className="admin-modal-close" 
                        onClick={onClose}
                        aria-label="Cerrar modal"
                    >
                        &times;
                    </button>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit}>
                    <div className="admin-modal-body">
                        <div className="admin-form-grid">

                            {/* Nombre del Producto */}
                            <div className="admin-field-group">
                                <label className="admin-field-label" htmlFor="name">
                                    <i className="fa-solid fa-tag"></i>
                                    Nombre del producto <span className="required-star">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="admin-field-input"
                                    placeholder="Ej: Perfume Floral Néctar 50ml"
                                    value={form.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                {formErrors.name && (
                                    <span style={{ color: '#dc3545', fontSize: '0.82rem' }}>{formErrors.name}</span>
                                )}
                            </div>

                            {/* Descripción */}
                            <div className="admin-field-group">
                                <label className="admin-field-label" htmlFor="description">
                                    <i className="fa-solid fa-align-left"></i>
                                    Descripción completa <span className="required-star">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="admin-field-textarea"
                                    placeholder="Detalles sobre ingredientes, aroma, acabado o modo de uso..."
                                    value={form.description}
                                    onChange={handleInputChange}
                                    required
                                />
                                {formErrors.description && (
                                    <span style={{ color: '#dc3545', fontSize: '0.82rem' }}>{formErrors.description}</span>
                                )}
                            </div>

                            {/* Categoría y Selector Dinámico de Materiales */}
                            <div className="admin-form-row">
                                <div className="admin-field-group">
                                    <label className="admin-field-label" htmlFor="category_id">
                                        <i className="fa-solid fa-folder-open"></i>
                                        Categoría <span className="required-star">*</span>
                                    </label>
                                    <select
                                        id="category_id"
                                        name="category_id"
                                        className="admin-field-select"
                                        value={form.category_id}
                                        onChange={handleCategoryChange}
                                        required
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Precio */}
                                <div className="admin-field-group">
                                    <label className="admin-field-label" htmlFor="price">
                                        <i className="fa-solid fa-dollar-sign"></i>
                                        Precio (ARS) <span className="required-star">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        className="admin-field-input"
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        value={form.price}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.price && (
                                        <span style={{ color: '#dc3545', fontSize: '0.82rem' }}>{formErrors.price}</span>
                                    )}
                                </div>
                            </div>

                            {/* SELECTOR DINÁMICO DE VARIANTES / MATERIALES (Sólo si categoría es 5) */}
                            {isCategoryFigures && (
                                <div className="variant-selector-box">
                                    <label className="admin-field-label" style={{ color: '#8c6439', marginBottom: '4px' }}>
                                        <i className="fa-solid fa-shapes"></i>
                                        Variante de Material (Aplica a Figuras y Esculturas):
                                    </label>
                                    <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#717784' }}>
                                        Selecciona el acabado principal del producto artesanal:
                                    </p>
                                    <div className="variant-options-group">
                                        <label className={`variant-radio-label ${form.material === 'yeso' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="material"
                                                value="yeso"
                                                checked={form.material === 'yeso'}
                                                onChange={() => handleMaterialChange('yeso')}
                                                style={{ display: 'none' }}
                                            />
                                            <i className="fa-solid fa-cube"></i> Yeso Sellado
                                        </label>

                                        <label className={`variant-radio-label ${form.material === 'cemento' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="material"
                                                value="cemento"
                                                checked={form.material === 'cemento'}
                                                onChange={() => handleMaterialChange('cemento')}
                                                style={{ display: 'none' }}
                                            />
                                            <i className="fa-solid fa-monument"></i> Cemento Impermeabilizado
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* Stock y Opciones de Visibilidad */}
                            <div className="admin-form-row">
                                <div className="admin-field-group">
                                    <label className="admin-field-label" htmlFor="quantity">
                                        <i className="fa-solid fa-boxes-stacked"></i>
                                        Cantidad en Stock <span className="required-star">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        className="admin-field-input"
                                        placeholder="1"
                                        min="0"
                                        value={form.quantity}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {formErrors.quantity && (
                                        <span style={{ color: '#dc3545', fontSize: '0.82rem' }}>{formErrors.quantity}</span>
                                    )}
                                </div>

                                <div className="admin-field-group" style={{ justifyContent: 'center' }}>
                                    <label className="admin-field-label">
                                        <i className="fa-solid fa-sliders"></i> Visibilidad y Estado
                                    </label>
                                    <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.92rem' }}>
                                            <input
                                                type="checkbox"
                                                name="active"
                                                checked={form.active}
                                                onChange={handleInputChange}
                                            />
                                            Activo en catálogo
                                        </label>

                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.92rem' }}>
                                            <input
                                                type="checkbox"
                                                name="highlighted"
                                                checked={form.highlighted}
                                                onChange={handleInputChange}
                                            />
                                            Destacado ⭐
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* CARGA DE IMAGEN (Input file compatible con multipart/form-data) */}
                            <div className="admin-field-group">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label className="admin-field-label">
                                        <i className="fa-solid fa-camera"></i>
                                        Imagen del producto (Multipart/Form-Data)
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setUseUrlInput(!useUrlInput)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#b79067',
                                            fontSize: '0.82rem',
                                            cursor: 'pointer',
                                            textDecoration: 'underline'
                                        }}
                                    >
                                        {useUrlInput ? "Usar archivo local" : "Ingresar URL de imagen"}
                                    </button>
                                </div>

                                {!useUrlInput ? (
                                    <div className="image-upload-wrapper">
                                        <div className="image-dropzone">
                                            <input
                                                type="file"
                                                id="product-image-file"
                                                name="image"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                            <div className="image-dropzone-icon">
                                                <i className="fa-solid fa-cloud-arrow-up"></i>
                                            </div>
                                            <p className="image-dropzone-text">
                                                Haz clic o arrastra una imagen aquí
                                            </p>
                                            <p className="image-dropzone-hint">
                                                PNG, JPG, WEBP de hasta 5MB (Multipart)
                                            </p>
                                        </div>

                                        {/* Previsualización en vivo */}
                                        {imagePreview && (
                                            <div className="image-preview-card">
                                                <img
                                                    src={imagePreview}
                                                    alt="Vista previa"
                                                    className="image-preview-thumbnail"
                                                />
                                                <div className="image-preview-details">
                                                    <span className="image-preview-name">
                                                        {imageFile ? imageFile.name : "Imagen actual del producto"}
                                                    </span>
                                                    <span className="image-preview-badge">
                                                        <i className="fa-solid fa-check"></i> Listo para publicar
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="image-preview-remove-btn"
                                                    onClick={handleRemoveSelectedImage}
                                                    title="Quitar imagen"
                                                >
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="admin-field-group">
                                        <input
                                            type="url"
                                            name="image"
                                            className="admin-field-input"
                                            placeholder="https://ejemplo.com/imagen.jpg"
                                            value={form.image}
                                            onChange={(e) => {
                                                handleInputChange(e);
                                                setImagePreview(e.target.value);
                                            }}
                                        />
                                        {imagePreview && (
                                            <div style={{ marginTop: '10px' }}>
                                                <img
                                                    src={imagePreview}
                                                    alt="Previsualización URL"
                                                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {formErrors.image && (
                                    <span style={{ color: '#dc3545', fontSize: '0.82rem' }}>{formErrors.image}</span>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* Pie del Modal con Acciones y Spinner */}
                    <div className="admin-modal-footer">
                        <button
                            type="button"
                            className="admin-btn-outline"
                            onClick={onClose}
                            disabled={submitting}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="admin-btn-primary"
                            disabled={submitting}
                        >
                            {submitting ? (
                                <>
                                    <span className="admin-spinner"></span>
                                    <span>Guardando...</span>
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-floppy-disk"></i>
                                    <span>{isEditing ? "Guardar Cambios" : "Publicar Producto"}</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default ProductFormModal;
