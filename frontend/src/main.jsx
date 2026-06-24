import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import PriceProvider from './components/PriceProvider.jsx';
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/firebase-messaging-sw.js')
//     .then((registration) => {
//       console.log('SW registered:', registration);
//     })
//     .catch((err) => {
//       console.error('SW registration failed:', err);
//     });
// }
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PriceProvider>
      <App />
    </PriceProvider>
  </StrictMode>
);
