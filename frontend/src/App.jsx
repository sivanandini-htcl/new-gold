import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Gold from "./pages/Gold";
import Silver from "./pages/Silver";
import Profile from "./pages/Profile";
import { PriceProvider } from "./components/PriceProvider";
import Signup from "./pages/Authentication/Signup";
import Login from "./pages/Authentication/Login";
import EditProfile from "./pages/EditProfile";
import KycPage from "./pages/KYC.jsx/KycPage";
import Nominee from "./pages/ProfileComponents/Nominee";
import Delivery from "./pages/ProfileComponents/Delivery";
import BankAccount from "./pages/ProfileComponents/BankAccount";
import BuyGold from "./pages/ProfileComponents/BuyGold";
import Billing from "./pages/ProfileComponents/Billing";
import Redeem from "./pages/ProfileComponents/Redeem";
import Cart from "./pages/ProfileComponents/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 ">
      <PriceProvider>
        <BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            theme="dark"
          />

          <Routes>
        <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            

          
            <Route element={<LayoutWithHeader />}>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gold"
                element={
                  <ProtectedRoute>
                    <Gold />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/silver"
                element={
                  <ProtectedRoute>
                    <Silver />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit"
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/kycpage"
                element={
                  <ProtectedRoute>
                    <KycPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/nominee"
                element={
                  <ProtectedRoute>
                    <Nominee />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/delivery"
                element={
                  <ProtectedRoute>
                    <Delivery />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <BankAccount />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/buygold"
                element={
                  <ProtectedRoute>
                    <BuyGold />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/billing"
                element={
                  <ProtectedRoute>
                    <Billing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/redeem"
                element={
                  <ProtectedRoute>
                    <Redeem />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </BrowserRouter>
      </PriceProvider>
    </div>
  );
}


function LayoutWithHeader() {
  return (
    <>
      <Header />
      <main className="pt-16"> 
        <Outlet />
      </main>
    </>
  );
}

export default App;