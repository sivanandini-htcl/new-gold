import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Gold from "./pages/Gold";
import Silver from "./pages/Silver";
import Profile from "./pages/Profile";
import  PriceProvider  from "./components/PriceProvider";
import Signup from "./pages/Authentication/Signup";
import Login from "./pages/Authentication/Login";
import EditProfile from "./pages/ProfileComponents/EditProfile";
import KycPage from "./pages/KYC.jsx/KycPage";
import Nominee from "./pages/ProfileComponents/Nominee";
import Delivery from "./pages/ProfileComponents/Delivery";
import BankAccount from "./pages/ProfileComponents/BankAccount";
// import BuyGold from "./pages/ProfileComponents/BuyGold";
import Billing from "./pages/ProfileComponents/Billing";
import Redeem from "./pages/ProfileComponents/Redeem";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";


import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
// import Redeemq from "./pages/ProfileComponents/redeem2";
import About from "./pages/About";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
// import Checkout1 from "./pages/Checkout1";
import MyOrders from "./pages/MyOrders";

import LoginOrCreateAccount from "./pages/Authentication/LoginOrCreateAccount";

function App() {
  return (
    <div className="min-h-screen flex flex-col  ">
      <PriceProvider/>
        <BrowserRouter>
          <ToastContainer position="top-right" autoClose={2000} theme="dark" />
                 <Toaster />

          <Routes>
            
        <Route path="/" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/login"element={<LoginOrCreateAccount />}
/>
          
            <Route element={<LayoutWithHeader />}>
              <Route path="/dashboard" element={  
                <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gold" element={
                  <ProtectedRoute>
                    <Gold />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/silver"  element={
                  <ProtectedRoute>
                    <Silver />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"  element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit" element={<ProtectedRoute> <EditProfile /> </ProtectedRoute>} />
              <Route
                path="/kycpage" element={<ProtectedRoute> <KycPage />  </ProtectedRoute>  } />
              <Route
                path="/nominee"   element={ <ProtectedRoute> <Nominee /> </ProtectedRoute>  }
              />
              <Route
                path="/delivery"  element={
                  <ProtectedRoute>
                    <Delivery />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account"  element={
                  <ProtectedRoute>
                    <BankAccount />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path="/buygold"  element={
                  <ProtectedRoute>
                    <BuyGold />
                  </ProtectedRoute>
                }
              /> */}
              <Route
                path="/billing" element={
                  <ProtectedRoute>
                    <Billing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/redeem"  element={
                  <ProtectedRoute>
                    <Redeem />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"  element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
               <Route
                path="/about"   element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                }
              />
              <Route path="/wishlist" element={
                      <ProtectedRoute>
                      <Wishlist />
                      </ProtectedRoute>
             } />


  <Route path="/checkout" element={
                      <ProtectedRoute>
                      <Checkout />
                      </ProtectedRoute>
             } />
          {/* <Route path="/checkout1"element={<ProtectedRoute><Checkout1/> </ProtectedRoute> }/> */}
          <Route path="/orders"element={<ProtectedRoute><MyOrders/> </ProtectedRoute> }/>



             <Route path="/productdetails/:id" element={
                      <ProtectedRoute>
                      <ProductDetails />
                      </ProtectedRoute>
             } />
             


            </Route>
            
            
            



            {/* <Route path="*" element={<NotFound />} /> */}
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