import React from 'react'
import useGetProducts from '../hooks/products/useGetProduct'
function Products() {
  const { error, products, loading } = useGetProducts()

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
    return (
      <>
        <div>
          <h2> Cargando exceso de belleza...🎀🪞💄🦢🕯️</h2>
        </div>
      </>
    )
  }
return(
        <>
            <div style={{ padding: '20px' }}>
                <h1 style={{ textAlign: 'center' }}>Nuestra Tienda</h1>
                
                {/* Si hay productos los mostramos, si está vacío avisamos */}
                {products.length > 0 ? (
                    <ProductCard products={products} />
                ) : (
                    <p style={{ textAlign: 'center' }}>No hay productos disponibles por el momento.</p>
                )}
            </div>
        </>
    );
}

export default Products