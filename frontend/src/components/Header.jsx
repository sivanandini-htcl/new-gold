import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { ShoppingCart, User, LogOut, Menu, X,Heart } from "lucide-react";

import { useWishlist } from "./WishlistContext";
// import dgiLogo from "../assets/dgiLogo.png";
import dgiLogo from "../assets/logo_2.svg"
import api from "../api/axiosInstance";
import useAuthStore from "../store/authStore";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const { wishlist } = useWishlist();

  // function handleLogout() {
  //   localStorage.removeItem("token");
  //   navigate("/");
  // }

  const handleLogout=async()=>{
    try{
 const res=await api.post("/auth/logout")
     console.log("Backend logout success:", res.data);
     console.log("Zustand cleared");

     useAuthStore.getState().logout();
     navigate("/")
     
    }catch(error){
     console.log("Backend logout failed:", error);
     useAuthStore.getState().logout();
     console.log("Zustand cleared after error");
     navigate("/")
    }
   

  };

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-md
    bg-gradient-to-br from-[#1a1508] via-[#2d2210] to-[#141414] border-b
     border-yellow-300/40 shadow-md">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 gap-3 flex items-center justify-between md:mr-2">

       
        {/* <Link to="/dashboard" className="flex items-center gap-2 no-underline"> */}
          <img className="w-15 md:w-17 md:ml-1  object-contain  ml-4 p-0 " src={dgiLogo} alt="logo "  />

         

          {/* <span className="hidden md:block text-xs uppercase tracking-widest mt-1 text-yellow-700">
            & Silver
          </span> */}
        {/* </Link> */}

        
        <nav className="hidden md:flex lg:text-sm md:gap-2 md:text-xs lg:gap-8 items-center gap-6  text-bold uppercase tracking-widest  text-yellow-500">
          <Link to="/dashboard" className="nav-item">Dashboard</Link>
          <Link to="/gold" className="nav-item">Gold</Link>
          <Link to="/silver" className="nav-item">Silver</Link>
          <Link to="/redeem" className="nav-item">Redeem</Link>
          <Link to="/checkout" className="nav-item">Checkout</Link>
          <Link to="/orders" className="nav-item">MyOrders</Link>

          <Link to="/about" className="nav-item">About</Link>
          
          {/* <Link to="/checkout1" className="nav-item">Checkout1</Link> */}


           
        </nav>
        
        <div className="flex items-center gap-3">
     
          <Link 
            to="/cart" 
            className="relative w-9 h-9 rounded-full flex items-center justify-center border border-yellow-300 bg-white text-yellow-800 hover:bg-yellow-100 hover:border-yellow-500 hover:text-yellow-600 transition"
          >
            <ShoppingCart className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute-top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-semibold bg-yellow-500 text-black">
                {totalItems}
              </span>
            )}
          </Link>
         <Link 
            to="/wishlist" 
            className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center border border-yellow-300 bg-white text-yellow-800 hover:bg-yellow-100 hover:border-yellow-500 hover:text-yellow-600 transition"
          >
            <Heart color="#4d2200"className="w-4 h-4" strokeWidth={1} />
         
          </Link>
          
          <Link 
            to="/profile" 
            className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center border border-yellow-300 bg-white text-yellow-800 hover:bg-yellow-100 hover:border-yellow-500 hover:text-yellow-600 transition">
            <User className="w-4 h-4" />
          </Link>
          

       
          <button 
            onClick={handleLogout} 
            className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 hover:border-gray-500 hover:text-gray-800 transition">
            <LogOut className="w-4 h-4" />
          </button>

      
          <button 
            className="md:hidden w-9 h-9 flex items-center justify-center border border-yellow-300 rounded-full bg-white text-yellow-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden bg-white border-t border-yellow-200 shadow-lg">
          <div className="flex flex-col p-4 gap-4 text-sm uppercase tracking-wider text-yellow-800">
            <Link to="/dashboard" onClick={()=>setIsOpen(false)}>Dashboard</Link>
            <Link to="/gold" onClick={()=>setIsOpen(false)}>Gold</Link>
            <Link to="/silver" onClick={()=>setIsOpen(false)}>Silver</Link>
            <Link to="/redeem" onClick={()=>setIsOpen(false)}>Redeem</Link>      
            <Link to="/profile" onClick={()=>setIsOpen(false)}>Profile</Link>
            <Link to="/checkout" onClick={()=>setIsOpen(false)}>Checkout</Link>         
            <Link to="/about"    onClick={()=>setIsOpen(false)}>About</Link>

            <button onClick={handleLogout} className="text-left">Logout</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
