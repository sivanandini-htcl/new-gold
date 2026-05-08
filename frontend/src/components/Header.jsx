// Header.jsx — Responsive sm → 2xl
// ✅ Cohesive dark gold navbar
// ✅ Clean icon buttons with tooltips on 2xl
// ✅ Improved mobile menu

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { ShoppingCart, User, LogOut, Menu, X, Heart, Gift } from "lucide-react";
import dgiLogo from "../assets/logo_2.svg";
import api from "../api/axiosInstance";
import useAuthStore from "../store/authStore";

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  // { to: "/gold", label: "Gold" },
  // { to: "/silver", label: "Silver" },
  { to: "/metals", label: "Metals" },
  { to: "/redeem", label: "Shop" },
  { to: "/gifting", label: "Gifting" },
  { to: "/checkout", label: "Checkout" },
  { to: "/orders", label: " Orders" },
  { to: "/about", label: "About" },
  

];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      const accessToken = useAuthStore.getState().accessToken;
      const refreshToken = useAuthStore.getState().refreshToken;
      await api.post("/auth/logout", { refreshToken }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
    } catch (error) {
      console.log("Logout error:", error.response?.data);
    } finally {
      useAuthStore.getState().logout();
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="sticky top-0 z-50 px-3 sm:px-5 lg:px-8 2xl:px-16 bg-[#faf7f2] py-3 2xl:py-4">

      <header className="rounded-2xl 2xl:rounded-3xl bg-gradient-to-r from-[#1a1508] via-[#2d2210] to-[#141414] border border-yellow-400/20 shadow-lg shadow-black/20 mt-10">

        <div className="flex items-center justify-between px-4 py-3 sm:px-5 2xl:px-8 2xl:py-4 lg:grid lg:grid-cols-3">

          {/* LEFT — LOGO */}
          <Link to="/dashboard" className="flex items-center">
            <img src={dgiLogo} alt="DGI Logo" className="h-10  sm:h-9 2xl:h-12 w-auto" />
          </Link>

          {/* CENTER — NAV (desktop) */}
          <nav className="hidden lg:flex justify-center gap-6 2xl:gap-8 font-serif text-sm 2xl:text-base text-[#ddd9ce]">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="relative text-[#DDD9CE] hover:text-amber-300 transition-colors duration-200 py-0.5
                  after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-amber-400
                  hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT — ICON BUTTONS */}
          <div className="flex items-center justify-end gap-2 2xl:gap-3">

            {/* Cart */}
            <Link
              to="/cart"
              className="relative w-9 h-9 2xl:w-11 2xl:h-11 flex items-center justify-center border border-[#DDD9CE]  bg-amber-400/10 text-[#DDD9CE] rounded-full hover:bg-amber-400/20 transition group"
            >
              <ShoppingCart className="w-4 h-4 2xl:w-5 2xl:h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 2xl:w-5 2xl:h-5 text-[9px] 2xl:text-[10px] font-black bg-[#DDD9CE] text-[#3C2415] rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Gifting shortcut */}
            <Link
              to="/gifting"
              className="hidden sm:flex w-9 h-9 2xl:w-11 2xl:h-11 items-center justify-center border border-[#DDD9CE]  bg-amber-400/10 text-[#DDD9CE] rounded-full hover:bg-amber-400/20 transition"
            >
              <Gift className="w-4 h-4 2xl:w-5 2xl:h-5" />
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="hidden sm:flex w-9 h-9 2xl:w-11 2xl:h-11 items-center justify-center border border-[#DDD9CE]  bg-amber-400/10 text-[#DDD9CE] rounded-full hover:bg-amber-400/20 transition"
            >
              <Heart className="w-4 h-4 2xl:w-5 2xl:h-5" />
            </Link>

            {/* Profile */}
            <Link
              to="/profile"
              className="hidden sm:flex w-9 h-9 2xl:w-11 2xl:h-11 items-center justify-center border border-[#DDD9CE]  bg-amber-400/10 text-[#DDD9CE] rounded-full hover:bg-amber-400/20 transition"
            >
              <User className="w-4 h-4 2xl:w-5 2xl:h-5" />
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="hidden sm:flex w-9 h-9 2xl:w-11 2xl:h-11 rounded-full items-center justify-center border border-[#DDD9CE]  bg-red-400/5 text-red-400/70 hover:bg-red-400/15 hover:text-red-300 hover:border-red-400/40 transition"
            >
              <LogOut className="w-4 h-4 2xl:w-5 2xl:h-5" />
            </button>

            {/* Hamburger (mobile) */}
            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center border border-amber-400/30 rounded-full bg-amber-400/10 text-amber-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={16} /> : <Menu size={16} />}
            </button>

          </div>
        </div>

      </header>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden mt-2 rounded-2xl bg-gradient-to-br from-[#1a1508] to-[#2a1d08] border border-amber-400/20 shadow-xl overflow-hidden">
          <div className="flex flex-col p-4 gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-serif text-amber-100/80 hover:bg-amber-400/10 hover:text-amber-300 transition"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-amber-400/10 mt-2 pt-2 flex gap-2">
              <Link to="/wishlist" onClick={() => setIsOpen(false)} className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold text-amber-300/70 border border-amber-400/20 rounded-xl hover:bg-amber-400/10 transition">
                <Heart size={13} /> Wishlist
              </Link>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold text-amber-300/70 border border-amber-400/20 rounded-xl hover:bg-amber-400/10 transition">
                <User size={13} /> Profile
              </Link>
              <button onClick={handleLogout} className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold text-red-400/70 border border-red-400/20 rounded-xl hover:bg-red-400/10 transition">
                <LogOut size={13} /> Logout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Header;