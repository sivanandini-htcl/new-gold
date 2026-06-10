// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { checkKYCStatus } from '../api/kycapi';
// import useAuthStore from '../store/authStore';

// /**
//  * AppInitializer - Wraps your app to check KYC status on load
//  * Usage: Wrap your <Routes> component with this
//  */
// export const AppInitializer = ({ children }) => {
//   const navigate = useNavigate();
//   const { isAuthenticated, accessToken } = useAuthStore();
//   const [initialized, setInitialized] = useState(false);
//   const [kycStatus, setKycStatus] = useState(null);

//   useEffect(() => {
//     const initializeApp = async () => {
//       try {
//         if (isAuthenticated && accessToken) {
//           // Check KYC status
//           const response = await checkKYCStatus('CUSTOMER');
//           if (response.success) {
//             const status = response.data.status;
//             setKycStatus(status);

//             // Store in localStorage for quick access
//             localStorage.setItem('kycStatus', status);

//             // Only redirect on initial routes
//             const currentPath = window.location.pathname;
//             if (currentPath === '/' || currentPath === '/home' || currentPath === '/dashboard') {
//               routeBasedOnKYCStatus(status);
//             }
//           }
//         }
//       } catch (error) {
//         console.error('App initialization error:', error);
//         // Default to NOT_SUBMITTED if error
//         setKycStatus('NOT_SUBMITTED');
//       } finally {
//         setInitialized(true);
//       }
//     };

//     initializeApp();
//   }, [isAuthenticated, accessToken]);

//   const routeBasedOnKYCStatus = (status) => {
//     switch (status) {
//       case 'VERIFIED':
//         // Go to dashboard
//         if (window.location.pathname === '/') {
//           navigate('/dashboard');
//         }
//         break;

//       case 'PENDING':
//       case 'UNDER_REVIEW':
//         // Show limited access dashboard with banner
//         if (window.location.pathname === '/') {
//           navigate('/dashboard');
//         }
//         break;

//       case 'REJECTED':
//         // Show rejection screen
//         if (window.location.pathname === '/') {
//           navigate('/kyc-rejected');
//         }
//         break;

//       case 'NOT_SUBMITTED':
//         // Redirect to KYC form
//         if (window.location.pathname === '/') {
//           navigate('/kyc');
//         }
//         break;

//       default:
//         break;
//     }
//   };

//   // If not initialized, show loading
//   if (!initialized && isAuthenticated) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-background">
//         <div className="text-center">
//           <div className="animate-spin w-12 h-12 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
//           <p className="text-gray-600">Initializing app...</p>
//         </div>
//       </div>
//     );
//   }

//   return children;
// };

// /**
//  * Hook to get KYC status globally
//  * Usage in any component: const { kycStatus } = useGlobalKYCStatus();
//  */
// export const useGlobalKYCStatus = () => {
//   const [kycStatus, setKycStatus] = useState(() => localStorage.getItem('kycStatus') || null);
//   const [loading, setLoading] = useState(false);

//   const updateStatus = async () => {
//     try {
//       setLoading(true);
//       const response = await checkKYCStatus('CUSTOMER');
//       if (response.success) {
//         const status = response.data.status;
//         setKycStatus(status);
//         localStorage.setItem('kycStatus', status);
//         return status;
//       }
//     } catch (error) {
//       console.error('Failed to update KYC status:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { kycStatus, loading, updateStatus };
// };

// export default AppInitializer;
