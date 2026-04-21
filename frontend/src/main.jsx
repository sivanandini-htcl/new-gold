import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'



import PriceProvider from './components/PriceProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <PriceProvider>

      
  
      
   <App />

   

    </PriceProvider>
   
  </StrictMode>,
)
