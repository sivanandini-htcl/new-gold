import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./styles/global.css";
import { CartProvider } from './components/CartContext.jsx';
import { WishlistProvider } from './components/WishlistContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WishlistProvider>
    <CartProvider>
      
   <App />

    </CartProvider>
    </WishlistProvider>
  </StrictMode>,
)
