import React from "react";
import ProductCard from "../components/cards";
import useGetProductsByCategory from "../hooks/products/useGetProductByCategory";

function CuidadosDiarios() {
    const { error, loading, products } = useGetProductsByCategory(4);
    
    if (error) {
        return (
            <div>
                <h2>Se ha producido un error en la carga de los productos. Por favor, espere o recargue la pagina</h2>
                <p> {error?.message || String(error)} </p>
            </div>
        );
    }
    
    if (loading) {
        return (
            <div>
                <h2>Cargando exceso de belleza...💆🏻‍♀️💕🧴💄🎀</h2>
            </div>
        );
    }

    return (
        <div>
            <h1>Cuidados Diarios</h1>
            <ProductCard products={products} />
        </div>
    );
}

export default CuidadosDiarios;

