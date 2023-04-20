import Cart from './pages/cart/cart'
import { CartContextProvider } from './context/cart-context'

function App() {

  return (
    <CartContextProvider>
      <Cart />
    </CartContextProvider>
  )
}

export default App
