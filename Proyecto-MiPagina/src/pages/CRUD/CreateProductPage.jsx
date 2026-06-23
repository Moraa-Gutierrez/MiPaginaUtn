import React, { useState } from "react";
import usePostProduct from "../../hooks/products/usePostProduct";
import { useNavigate } from "react-router-dom";

function ProductPage() {
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
            // Limpiamos el form
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
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="name">Nombre de producto</label>
                <input
                    onChange={handleInputChange}
                    value={form.name}
                    type="text"
                    required
                    name="name"
                    id="name"
                />
                <label htmlFor="image">Url de la imagen</label>
                <input
                    onChange={handleInputChange}
                    value={form.image}
                    type="text"
                    required
                    name="image"
                    id="image"
                />
                <label htmlFor="description">Descripcion</label>
                <textarea
                    onChange={handleInputChange}
                    value={form.description}
                    required
                    name="description"
                    id="description"
                ></textarea>
                <label htmlFor="category_id">Categoria</label>
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
                <label htmlFor="price">Precio</label>
                <input
                    onChange={handleInputChange}
                    value={form.price}
                    type="number"
                    required
                    name="price"
                    id="price"
                />
                <label htmlFor="quantity">Stock</label>
                <input
                    onChange={handleInputChange}
                    value={form.quantity}
                    type="number"
                    required
                    name="quantity"
                    id="quantity"
                />
                <label htmlFor="highlighted"></label>
                <select
                    onChange={handleHighlightedChange}
                    value={form.highlighted ? "true" : "false"}
                    name="highlighted"
                    id="highlighted"
                    required
                >
                    <option value="false">No, común</option>
                    <option value="true">Sí, destacado ★</option>
                </select>

                <button type="submit" style={{ padding: "8px 16px", cursor: "pointer", backgroundColor: " #464d5d" }}>
                    Guardar Producto
                </button>

            </form>
        </>
    );
}
export default CreateProductPage;