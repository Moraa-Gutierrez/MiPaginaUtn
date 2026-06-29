
import Layout from './components/Layout/Layout'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
function App() {

  return (
    <CartProvider>
      <Layout/>
    </CartProvider>
  )
}

export default App
