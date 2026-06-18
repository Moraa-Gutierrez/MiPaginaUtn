import React from "react";
import ProductCard from "../components/Cards";
import useGetProductsByCategory from "../hooks/products/useGetProductByCategory";

function Accesorios() {
    //devuelve un objeto(el producto).React ejecuta el hook una sola vez, hace una sola petición a la API, y te reparte las tres variables listas para usar.
    const { products, error, loading } = useGetProductsByCategory(2);

    if (error) {
        return (
            <>
            <div>
                <h2>Se ha producido un error en la carga de los productos. Por favor, espere o recargue la pagina</h2>
                <p> {error?.message || String(error)} </p> {/*tengo error? si tengo error, hay mensaje. Si no, paso el error por string*/}
            </div>
                
            </>
        )
    }
    if (loading) {
        return(
            <>
            <div>
                  <h2> Cargando exceso de belleza...💍📿👜👒</h2>
            </div>
            </>
        )
    }
    return (
        <div>
             <h1>Accesorios</h1>
             {products.length > 0? (
                <ProductCard products={products}/>
             ):(
                <h2>No hay productos disponibles en este momento. Por favor, vuelva mas tarde</h2>
             )
             }
        </div>
       
    );
}

export default Accesorios
