import React from "react";
import ProductCard from "../components/Cards";
import useGetProductsByCategory from "../hooks/products/useGetProductByCategory";
import React from 'react'

function Velas() {
    const { error, loading, products } = useGetProductsByCategory(4)
    if (error) {
        <>
            <div>
                <h2>Se ha producido un error en la carga de los productos. Por favor, espere o recargue la pagina</h2>
                <p> {error?.message || String(error)} </p> {/*tengo error? si tengo error, hay mensaje. Si no, paso el error por string*/}
            </div>
        </>
    }
    if (loading) {
        <h2>Cargando exceso de belleza...༉‧₊˚🕯️💛❀༉‧₊˚.</h2>
    }
    return (
        <>
            <div>
                <h1>Velas</h1>
                {products.length > 0 ? (
                    <ProductCard products={products} />
                ) : (
                    <h2>No hay productos disponibles en este momento. Por favor, vuelva mas tarde</h2>
                )}
            </div>
        </>
    );
}

export default Velas