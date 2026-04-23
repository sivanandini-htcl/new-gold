import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { ShoppingCart, User, LogOut, Menu, X,Heart } from "lucide-react";
// import { useWishlist } from "./WishlistContext";
// import dgiLogo from "../assets/dgiLogo.png";
import dgiLogo from "../assets/logo_2.svg"
import api from "../api/axiosInstance";
import useAuthStore from "../store/authStore";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
 
  const navigate = useNavigate();
  // const { wishlist } = useWishlist();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
  try {
    const accessToken = useAuthStore.getState().accessToken;
    const refreshToken = useAuthStore.getState().refreshToken;

    await api.post("/auth/logout", {
      refreshToken
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

  } catch (error) {
    console.log("Logout error:", error.response?.data);
  } finally {
    useAuthStore.getState().logout();
    navigate("/", { replace: true });
  }
};

  return (
    <div className="px-3 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-50">

  <header className="mt-9 mx-1 p-3 px-5 rounded-4xl bg-gradient-to-br from-[#1a1508] via-[#2d2210] to-[#141414] border-b border-yellow-300/40">

    {/* MAIN HEADER ROW */}
    <div className="flex items-center justify-between lg:grid lg:grid-cols-3">

      {/* LEFT - LOGO */}
      <div className="flex items-center">
        <img src={dgiLogo} alt="logo" />
      </div>

      {/* CENTER - NAV (DESKTOP ONLY) */}
      <nav className="hidden lg:flex justify-center gap-10 font-serif text-[#ddd9ce]">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/gold">Gold</Link>
        <Link to="/silver">Silver</Link>
        <Link to="/redeem">Redeem</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/orders">MyOrders</Link>
        <Link to="/about">About</Link>
      </nav>

      {/* RIGHT - ICONS + MENU */}
      <div className="flex items-center justify-end gap-3">

        <Link to="/cart" className="relative w-9 h-9 flex items-center justify-center border border-yellow-300 bg-white text-yellow-800 rounded-full">
          <ShoppingCart className="w-4 h-4" />
        </Link>

        <Link to="/wishlist" className="hidden sm:flex w-9 h-9 items-center justify-center border border-yellow-300 bg-white text-yellow-800 rounded-full">
          <Heart className="w-4 h-4" />
        </Link>

        <Link to="/profile" className="hidden sm:flex w-9 h-9 items-center justify-center border border-yellow-300 bg-white text-yellow-800 rounded-full">
          <User className="w-4 h-4" />
        </Link>

        <button
          className="md:hidden w-9 h-9 flex items-center justify-center border border-yellow-300 rounded-full bg-white text-yellow-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

      </div>

    </div>

  </header>

  {/* MOBILE MENU */}
  {isOpen && (
    <div className="md:hidden mt-2 mx-1 rounded-2xl bg-white border border-yellow-200 shadow-lg">
      <div className="flex flex-col p-4 gap-4 text-sm uppercase tracking-wider text-yellow-800">

        <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
        <Link to="/gold" onClick={() => setIsOpen(false)}>Gold</Link>
        <Link to="/silver" onClick={() => setIsOpen(false)}>Silver</Link>
        <Link to="/redeem" onClick={() => setIsOpen(false)}>Redeem</Link>
        <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
        <Link to="/checkout" onClick={() => setIsOpen(false)}>Checkout</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>

        <button onClick={handleLogout} className="text-left">
          Logout
        </button>

      </div>
    </div>
  )}

</div>
  );
}
export default Header;