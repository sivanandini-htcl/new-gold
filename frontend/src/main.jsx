import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { CartProvider } from './components/CartContext.jsx';
import { WishlistProvider } from './components/WishlistContext.jsx';
import { OrdersProvider } from './components/OrderContext.jsx';
import PriceProvider from './components/PriceProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <PriceProvider>

      <OrdersProvider>
    <WishlistProvider>
    <CartProvider>
      
   <App />

    </CartProvider>
    </WishlistProvider>
     </OrdersProvider>
    </PriceProvider>
   
  </StrictMode>,
)
