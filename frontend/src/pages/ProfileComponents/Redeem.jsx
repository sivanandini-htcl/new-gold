import React, { useState } from "react";
import { useCart } from "../../components/CartContext";
import { jewelleryProducts } from "../Data/jewelleryProducts";
import { toast } from "react-toastify";
import {
  SlidersHorizontal,
  Heart,
  X,
  ShoppingCart,
  ChevronDown,
  Search,
} from "lucide-react";
import { useWishlist } from "../../components/WishlistContext";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/cartStore";


function Redeem() {

  const { addToWishlist, isWishlisted } = useWishlist();

const { cartItems, addToCart, replaceCartItem, removeFromCart, updateQuantity } = useCartStore();
  const navigate = useNavigate();

  const [metalType, setMetalType] = useState("gold");
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [filters, setFilters] = useState({
    shape: "",
    productType: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    minWeight: "",
    maxWeight: "",
  });

  // Replace Modal States
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);

  const uniqueShapes = [
    ...new Set(jewelleryProducts.map((p) => p.shape).filter(Boolean)),
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      shape: "", productType: "", category: "",
      minPrice: "", maxPrice: "", minWeight: "", maxWeight: "",
    });
    setSearchQuery("");
    setSortBy("");
  };

  const activeFilterCount =
    Object.values(filters).filter(Boolean).length + (searchQuery ? 1 : 0);

  const filteredProducts = jewelleryProducts
    .filter((p) =>
      p.type === metalType &&
      (filters.shape === "" || p.shape === filters.shape) &&
      (filters.productType === "" || p.productType === filters.productType) &&
      (filters.category === "" || p.category === filters.category) &&
      (filters.minPrice === "" || p.price >= Number(filters.minPrice)) &&
      (filters.maxPrice === "" || p.price <= Number(filters.maxPrice)) &&
      (filters.minWeight === "" || p.weight >= Number(filters.minWeight)) &&
      (filters.maxWeight === "" || p.weight <= Number(filters.maxWeight)) &&
      (searchQuery === "" || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "weight_asc") return a.weight - b.weight;
      if (sortBy === "weight_desc") return b.weight - a.weight;
      return 0;
    });

  // Main Add to Cart Handler - Only One Item Allowed
  const handleAddToCart = (product) => {
    if (cartItems.length === 0 || cartItems[0].id === product.id) {
      addToCart(product);
      toast.success(`${product.name} added to cart`);
      return;
    }

    // Different item → Show Replace Modal
    setPendingItem(product);
    setShowReplaceModal(true);
  };

  const isGold = metalType === "gold";

  return (
    <>
      {/* Filter Drawer (unchanged) */}
      {filterOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setFilterOpen(false)} />
      )}

      <div className={`fixed top-0 left-0 h-full w-[300px] bg-white z-50 p-6 overflow-y-auto transition-transform ${filterOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* ... your existing filter drawer code ... */}
        {/* (I kept it same - no change needed) */}
      </div>

      {/* Main Page */}
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10">
            {isGold ? (
              <div className="flex gap-2 justify-center font-serif">
                <span className="text-4xl font-bold bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">Gold</span>
                <span className="text-4xl font-bold">Jewellery</span>
              </div>
            ) : (
              <div className="flex gap-2 justify-center font-serif">
                <span className="text-4xl font-bold bg-gradient-to-r from-gray-700 via-gray-400/80 to-gray-900 bg-clip-text text-transparent">Silver</span>
                <span className="text-4xl font-bold">Jewellery</span>
              </div>
            )}
            <p className="text-sm text-gray-500">Redeem your digital holdings</p>
          </div>

          {/* Metal Toggle + Filter Button */}
          <div className="flex items-center justify-between mb-6 gap-3">
            <div className="flex rounded-xl overflow-hidden gap-1 bg-amber-700/10">
              <button onClick={() => setMetalType("gold")} className={`px-6 py-2 text-sm ${metalType === "gold" ? "bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-black rounded-xl" : "bg-white rounded-xl"}`}>
                Gold
              </button>
              <button onClick={() => setMetalType("silver")} className={`px-6 py-2 text-sm ${metalType === "silver" ? "bg-gradient-to-r from-gray-700 via-gray-200 to-gray-600 text-gray-900 rounded-xl" : "bg-white rounded-xl"}`}>
                Silver
              </button>
            </div>

            <button onClick={() => setFilterOpen(true)} className="flex items-center gap-2 border border-amber-700/20 px-4 py-2 rounded-lg text-sm">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && <span className="bg-yellow-500 text-xs px-2 rounded-full">{activeFilterCount}</span>}
            </button>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg mb-4">No Products Found</p>
              <button onClick={clearFilters} className="px-6 py-2 bg-yellow-500 rounded-lg">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-amber-700/20">
                  <div className="h-48 w-full bg-yellow-700/10 cursor-pointer" onClick={() => navigate(`/productdetails/${product.id}`)}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                  </div>

                  <div className="p-4">
                    <h3 onClick={() => navigate(`/productdetails/${product.id}`)} className="font-semibold cursor-pointer">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">{product.weight}g</p>
                    <p className="font-bold text-lg mb-3">₹{product.price.toLocaleString("en-IN")}</p>

                    <button onClick={() => handleAddToCart(product)} className="w-full bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-black shadow-lg py-2 rounded-lg text-sm mb-2 flex items-center justify-center gap-2 hover:scale-105 transition">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>

                    <button onClick={() => addToWishlist(product)} className="w-full py-2 rounded-lg text-sm flex items-center justify-center gap-2 border border-amber-700/20 hover:scale-105 transition">
                      <Heart className={`w-4 h-4 ${isWishlisted(product.id) ? "text-red-500 fill-red-500" : "text-gray-500"}`} />
                      Wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Replace Modal */}
      {showReplaceModal && pendingItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-semibold mb-2">Replace Cart Item?</h2>
            <p className="text-sm text-gray-600 mb-6">
              Your cart already has <strong>{cartItems[0]?.name}</strong>.<br />
              Do you want to replace it with <strong>{pendingItem.name}</strong>?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowReplaceModal(false);
                  setPendingItem(null);
                }}
                className="flex-1 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  replaceCartItem(pendingItem);
                  setShowReplaceModal(false);
                  setPendingItem(null);
                  toast.success(`${pendingItem.name} added to cart`);
                }}
                className="flex-1 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl text-sm font-medium"
              >
                Yes, Replace
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Redeem;