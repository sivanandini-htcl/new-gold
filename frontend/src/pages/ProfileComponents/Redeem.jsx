import React, { useState } from "react";
import { jewelleryProducts } from "../Data/jewelleryProducts";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  ShoppingCart,
  X,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/cartStore";

function Redeem() {
  const { cartItems, addToCart, replaceCartItem } = useCartStore();
  const navigate = useNavigate();

  const [metalType, setMetalType]               = useState("gold");
  const [filterOpen, setFilterOpen]             = useState(false);
  const [searchQuery, setSearchQuery]           = useState("");
  const [sortBy, setSortBy]                     = useState("");
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [pendingItem, setPendingItem]           = useState(null);

  const [filters, setFilters] = useState({
    shape: "", productType: "", category: "",
    minPrice: "", maxPrice: "", minWeight: "", maxWeight: "",
  });

  const uniqueShapes = [
    ...new Set(jewelleryProducts.map((p) => p.shape).filter(Boolean)),
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ shape: "", productType: "", category: "", minPrice: "", maxPrice: "", minWeight: "", maxWeight: "" });
    setSearchQuery("");
    setSortBy("");
  };

  const activeFilterCount =
    Object.values(filters).filter(Boolean).length + (searchQuery ? 1 : 0);

  const filteredProducts = jewelleryProducts
    .filter((p) =>
      p.type === metalType &&
      (filters.shape === ""       || p.shape       === filters.shape) &&
      (filters.productType === "" || p.productType === filters.productType) &&
      (filters.category === ""    || p.category    === filters.category) &&
      (filters.minPrice === ""    || p.price  >= Number(filters.minPrice)) &&
      (filters.maxPrice === ""    || p.price  <= Number(filters.maxPrice)) &&
      (filters.minWeight === ""   || p.weight >= Number(filters.minWeight)) &&
      (filters.maxWeight === ""   || p.weight <= Number(filters.maxWeight)) &&
      (searchQuery === ""         || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "price_asc")   return a.price  - b.price;
      if (sortBy === "price_desc")  return b.price  - a.price;
      if (sortBy === "weight_asc")  return a.weight - b.weight;
      if (sortBy === "weight_desc") return b.weight - a.weight;
      return 0;
    });

  const handleAddToCart = (product) => {
    if (cartItems.length === 0 || cartItems[0].id === product.id) {
      addToCart(product);
      toast.success(`${product.name} added to cart`);
      return;
    }
    setPendingItem(product);
    setShowReplaceModal(true);
  };

  const isGold = metalType === "gold";

  // ── Framer Motion variants ──────────────────────────────────────────────
  // 1. Page wrapper — simple fade+slide for the whole page
  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1, y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // 2. Each product card — uses "custom" prop to receive its index for stagger
  const cardVariants = {
    initial: { opacity: 0, y: 40 },
    animate: (index) => ({          // ← function form receives custom={index}
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.07,        // 0ms, 70ms, 140ms … per card
        duration: 0.45,
        ease: "easeOut",
      },
    }),
  };

  // 3. Filter drawer — spring slide from left
  const drawerVariants = {
    closed: { x: "-100%" },
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  // 4. Replace modal — spring scale+fade
  const modalVariants = {
    initial: { opacity: 0, scale: 0.88, y: 20 },
    animate: {
      opacity: 1, scale: 1, y: 0,
      transition: { type: "spring", stiffness: 280, damping: 22 },
    },
    exit: {
      opacity: 0, scale: 0.88, y: 20,
      transition: { duration: 0.2 },
    },
  };

 
  return (
    // ── Page wrapper: ONE motion.div — no "index" here ──────────────────
    <motion.div variants={pageVariants} initial="initial" animate="animate">

      {/* ── Filter backdrop */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setFilterOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Filter Drawer */}
      <motion.div
        variants={drawerVariants}
        initial="closed"
        animate={filterOpen ? "open" : "closed"}
        className="fixed top-0 left-0 h-full w-[300px] bg-white z-50 p-6 overflow-y-auto shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-serif">Filters</h2>
          <button onClick={() => setFilterOpen(false)} className="p-1.5 rounded-full hover:bg-gray-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <label className="text-xs font-serif text-gray-500 uppercase tracking-wider mb-1 block">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-700" />
            <input placeholder="Necklace, ring…" value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm border border-amber-700/20 rounded-lg outline-none focus:border-amber-500" />
          </div>
        </div>

        {/* Sort */}
        <div className="mb-4">
          <label className="text-xs font-serif text-gray-500 uppercase tracking-wider mb-1 block">Sort By</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="w-full py-2 px-3 text-sm border border-amber-700/20 rounded-lg outline-none">
            <option value="">Default</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="weight_asc">Weight: Light → Heavy</option>
            <option value="weight_desc">Weight: Heavy → Light</option>
          </select>
        </div>

        {/* Shape */}
        <div className="mb-4">
          <label className="text-xs font-serif text-gray-500 uppercase tracking-wider mb-1 block">Shape</label>
          <select name="shape" value={filters.shape} onChange={handleFilterChange}
            className="w-full py-2 px-3 text-sm border border-amber-700/20 rounded-lg outline-none">
            <option value="">All Shapes</option>
            {uniqueShapes.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Price range */}
        <div className="mb-4">
          <label className="text-xs font-serif text-gray-500 uppercase tracking-wider mb-1 block">Price (₹)</label>
          <div className="grid grid-cols-2 gap-2">
            <input name="minPrice" placeholder="Min" value={filters.minPrice}
              onChange={handleFilterChange} type="number"
              className="py-2 px-3 text-sm border border-amber-700/20 rounded-lg outline-none" />
            <input name="maxPrice" placeholder="Max" value={filters.maxPrice}
              onChange={handleFilterChange} type="number"
              className="py-2 px-3 text-sm border border-amber-700/20 rounded-lg outline-none" />
          </div>
        </div>

        {/* Weight range */}
        <div className="mb-6">
          <label className="text-xs font-serif text-gray-500 uppercase tracking-wider mb-1 block">Weight (g)</label>
          <div className="grid grid-cols-2 gap-2">
            <input name="minWeight" placeholder="Min" value={filters.minWeight}
              onChange={handleFilterChange} type="number"
              className="py-2 px-3 text-sm border border-amber-700/20 rounded-lg outline-none" />
            <input name="maxWeight" placeholder="Max" value={filters.maxWeight}
              onChange={handleFilterChange} type="number"
              className="py-2 px-3 text-sm border border-amber-700/20 rounded-lg outline-none" />
          </div>
        </div>

        {activeFilterCount > 0 && (
          <button onClick={clearFilters}
            className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl text-sm font-serif transition">
            Clear All Filters
          </button>
        )}
      </motion.div>

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
            <p className="text-sm text-gray-500 mt-1">Redeem your digital holdings</p>
          </div>

          {/* Metal Toggle + Filter Button */}
          <div className="flex items-center justify-between mb-6 gap-3">
            <div className="flex rounded-xl overflow-hidden gap-1 bg-amber-700/10">
              <button onClick={() => setMetalType("gold")}
                className={`px-6 py-2 text-sm transition ${metalType === "gold"
                  ? "bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-black rounded-xl"
                  : "bg-white rounded-xl"}`}>
                Gold
              </button>
              <button onClick={() => setMetalType("silver")}
                className={`px-6 py-2 text-sm transition ${metalType === "silver"
                  ? "bg-gradient-to-r from-gray-700 via-gray-200 to-gray-600 text-gray-900 rounded-xl"
                  : "bg-white rounded-xl"}`}>
                Silver
              </button>
            </div>

            <button onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 border border-amber-700/20 bg-white px-4 py-2 rounded-lg text-sm hover:bg-amber-50 transition">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-yellow-500 text-white text-xs px-2 rounded-full">{activeFilterCount}</span>
              )}
            </button>
          </div>

          {/* ── Products Grid ─────────────────────────────────────────────── */}
          {filteredProducts.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-lg mb-4">No Products Found</p>
              <button onClick={clearFilters} className="px-6 py-2 bg-yellow-500 text-white rounded-lg">
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

              {filteredProducts.map((product, index) => (
                // ↑ index is declared HERE in .map() — this is the only correct place

                <motion.div
                  key={product.id}
                  custom={index}          // ← passes index into cardVariants.animate(index)
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(180,130,30,0.18)" }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-amber-700/20"
                >
                  {/* Image */}
                  <div
                    className="h-48 w-full p-2 cursor-pointer overflow-hidden"
                    onClick={() => navigate(`/productdetails/${product.id}`)}
                  >
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.35 }}
                    />
                  </div>

                  <div className="w-full h-0.5 bg-gray-100" />

                  {/* Info */}
                  <div className="p-4">
                    <h3
                      onClick={() => navigate(`/productdetails/${product.id}`)}
                      className="font-serif cursor-pointer hover:text-yellow-700 transition"
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">{product.weight}g</p>
                    <p className="font-bold text-lg mb-3">₹{product.price.toLocaleString("en-IN")}</p>

                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-black shadow-lg py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}

            </div>
          )}
        </div>
      </div>

      {/* ── Replace Modal ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showReplaceModal && pendingItem && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              key="modal-box"
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl"
            >
              <h2 className="text-lg font-serif mb-2">Replace Cart Item?</h2>
              <p className="text-sm text-gray-600 mb-6">
                Your cart already has <strong>{cartItems[0]?.name}</strong>.<br />
                Do you want to replace it with <strong>{pendingItem.name}</strong>?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => { setShowReplaceModal(false); setPendingItem(null); }}
                  className="flex-1 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    replaceCartItem(pendingItem);
                    setShowReplaceModal(false);
                    setPendingItem(null);
                    toast.success(`${pendingItem.name} added to cart`);
                  }}
                  className="flex-1 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl text-sm font-medium transition"
                >
                  Yes, Replace
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

export default Redeem;