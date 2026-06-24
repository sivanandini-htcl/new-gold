import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Header from './components/Header';
import PriceProvider from './components/PriceProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';
import useCartStore from './store/cartStore';

// Lazy load all pages for code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Gold = lazy(() => import('./pages/Gold'));
const Silver = lazy(() => import('./pages/Silver'));
const Profile = lazy(() => import('./pages/Profile'));
const Signup = lazy(() => import('./pages/Authentication/Signup'));
const Login = lazy(() => import('./pages/Authentication/Login'));
const ResetEmail = lazy(() => import('./pages/Authentication/ResetEmail'));
const EditProfile = lazy(() => import('./pages/ProfileComponents/EditProfile'));
const KycPage = lazy(() => import('./pages/ProfileComponents/KycPage'));
const Nominee = lazy(() => import('./pages/ProfileComponents/Nominee'));
const Delivery = lazy(() => import('./pages/ProfileComponents/Delivery'));
const BankAccount = lazy(() => import('./pages/ProfileComponents/BankAccount'));
const Wallet = lazy(() => import('./pages/ProfileComponents/Wallet'));
const Redeem = lazy(() => import('./pages/ProfileComponents/Redeem'));
const Cart = lazy(() => import('./pages/Cart'));
const About = lazy(() => import('./pages/About'));
const Checkout = lazy(() => import('./pages/Checkout'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const MyOrders = lazy(() => import('./pages/MyOrders'));
const Metals = lazy(() => import('./pages/Metals'));
const OrderDetailsPage = lazy(() => import('./pages/OrderDetailsPage'));
const Transactions = lazy(() => import('./pages/ProfileComponents/Transaction'));
const WalletTransaction = lazy(
  () => import('./pages/ProfileComponents/transactions/WalletTransaction')
);
const GatewayTransaction = lazy(
  () => import('./pages/ProfileComponents/transactions/GatewayTransaction')
);
const Analytics = lazy(() => import('./pages/Analytics'));
const MPINSetupPage = lazy(() => import('./pages/ProfileComponents/mpinComponents/MPINSetupPage'));
const MpinPage = lazy(() => import('./pages/ProfileComponents/mpinComponents/Mpin'));
const TestingPage = lazy(() => import('./pages/TestingPage'));
const GoldSell = lazy(() => import('./pages/ProfileComponents/sell/GoldSell'));
const SilverSell = lazy(() => import('./pages/ProfileComponents/sell/SilverSell'));
const ChangeMPIN = lazy(() => import('./pages/ProfileComponents/mpinComponents/ChangeMPIN'));
const ResetMPIN = lazy(() => import('./pages/ProfileComponents/mpinComponents/ResetMpin'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
  </div>
);

function App() {
  // const fetchCart = useCartStore((state) => state.fetchCart);
  // useEffect(() => {
  //   fetchCart();
  // }, []);
  return (
    <div className="min-h-screen flex flex-col  ">
      <PriceProvider />
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={2000} theme="dark" />
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<PageLoader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/reset-password"
            element={
              <Suspense fallback={<PageLoader />}>
                <ResetEmail />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<PageLoader />}>
                <Signup />
              </Suspense>
            }
          />

          <Route element={<LayoutWithHeader />}>
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/gold"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <Gold />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/silver"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <Silver />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/changempin"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <ChangeMPIN />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/resetmpin"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <ResetMPIN />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/testing"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <TestingPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/profile"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/edit"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/kycpage"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <KycPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/mpin-setup"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <MPINSetupPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/nominee"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <Nominee />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/delivery"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <Delivery />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/metals"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <Metals />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/account"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <BankAccount />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/goldsell"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <GoldSell />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/silversell"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <SilverSell />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/wallet"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <Wallet />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/redeem"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <Redeem />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/analytics"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/cart"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/checkout"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/transactions"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <Transactions />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/wallettransactions"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <WalletTransaction />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/gatewaytransaction"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <GatewayTransaction />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/orders"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <MyOrders />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="/mpin"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <MpinPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/orders/:id"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <OrderDetailsPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route
              path="/productdetails/:id"
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProtectedRoute>
                    <ProductDetails />
                  </ProtectedRoute>
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function LayoutWithHeader() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
