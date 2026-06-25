import Layout from './components/Layout/Layout'
import { CartProvider } from './context/CartContext'
import "../../Proyecto-MiPagina/src/Css/App.css"
function App() {

  return (
    <CartProvider>
      <Layout/>
    </CartProvider>
  )
}

export default App
