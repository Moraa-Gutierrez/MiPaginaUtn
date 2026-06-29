import React from 'react'
import { useParams } from 'react-router-dom'
import useGetProducts from '../hooks/products/useGetProduct'
import useGetProductsByCategory from '../hooks/products/useGetProductByCategory'
import ProductCard from '../components/Cards'
import useDeleteProducts from '../hooks/products/useDeleteProducts'
import "../Css/Products.css"

function Products() {
  const { category_id } = useParams()
  const allProductsData = useGetProducts()
  const categoryProductsData = useGetProductsByCategory(category_id)

  const { error, products, loading, getProducts } = category_id 
    ? { ...categoryProductsData, getProducts: allProductsData.getProducts } 
    : allProductsData;

  const { deleteProducts } = useDeleteProducts()

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      const success = await deleteProducts(id)
      if (success) {
        window.alert("Producto eliminado con éxito.")
        // Refresh products list
        getProducts()
      } else {
        window.alert("Ocurrió un error al intentar eliminar el producto.")
      }
    }
  }

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
                    <ProductCard products={products} onDelete={handleDelete} />
                ) : (
                    <h2 className='sin-productos'>No hay productos disponibles por el momento.</h2>
                )}
            </div>
        </>
    );
}

export default Products