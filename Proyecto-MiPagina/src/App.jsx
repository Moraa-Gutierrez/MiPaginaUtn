
import Layout from './components/Layout/Layout'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <Layout/>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
