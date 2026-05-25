import React, { useState, useEffect } from "react";
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
import api from "../../api/axiosInstance";
import PageLoader from "../../components/ProfileLoading";

function Redeem() {
  const { cartItems, fetchCart } = useCartStore();

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [metalType, setMetalType] = useState("gold");
  const [filterOpen, setFilterOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [showReplaceModal, setShowReplaceModal] = useState(false);

  const [pendingItem, setPendingItem] = useState(null);

  const [isProcessing, setIsProcessing] = useState(false);

  const getCartType = () => {
    if (cartItems.length === 0) return null;

    const hasMetal = cartItems.some(
      (item) => item.type === "METAL"
    );

    const hasProduct = cartItems.some(
      (item) => item.type === "PRODUCT"
    );

    if (hasMetal && !hasProduct) return "METAL";

    if (hasProduct && !hasMetal) return "PRODUCT";

    return "MIXED";
  };

  const [filters, setFilters] = useState({
    shape: "",
    productType: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    minWeight: "",
    maxWeight: "",
  });

  useEffect(() => {
    fetchProducts();
  }, [metalType]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get("/products/public");

      console.log(res.data);

      const fetchedProducts =
        res.data?.data?.products || [];

      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Fetch products error:", error);

      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const uniqueShapes = [
    ...new Set(
      products
        .map((p) => p.shape)
        .filter(Boolean)
    ),
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      shape: "",
      productType: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      minWeight: "",
      maxWeight: "",
    });

    setSearchQuery("");

    setSortBy("");
  };

  const activeFilterCount =
    Object.values(filters).filter(Boolean)
      .length + (searchQuery ? 1 : 0);

  const filteredProducts = products
    .filter(
      (p) =>
        (filters.shape === "" ||
          p.shape === filters.shape) &&
        (filters.category === "" ||
          p.category === filters.category) &&
        (filters.minPrice === "" ||
          (p.price || 0) >=
            Number(filters.minPrice)) &&
        (filters.maxPrice === "" ||
          (p.price || 0) <=
            Number(filters.maxPrice)) &&
        (searchQuery === "" ||
          p.name
            ?.toLowerCase()
            .includes(
              searchQuery.toLowerCase()
            ))
    )
    .sort((a, b) => {
      if (sortBy === "price_asc") {
        return (a.price || 0) - (b.price || 0);
      }

      if (sortBy === "price_desc") {
        return (b.price || 0) - (a.price || 0);
      }

      return 0;
    });

  const handleAddToCart = async (product) => {
    const newItem = {
      type: "PRODUCT",
      productId: product.id,
      quantity: 1,
    };

    const cartType = getCartType();

    // If metals exist -> ask replace
    if (cartType === "METAL") {
      setPendingItem({
        ...newItem,
        name: product.name,
      });

      setShowReplaceModal(true);

      return;
    }

    try {
      const res=await api.post("/cart/add", newItem);

      await fetchCart();

      toast.success("Added to cart");
      console.log("added:" , res.data)

      navigate("/cart");
    } catch (err) {
      console.error(err);

      toast.error("Failed to add to cart");
    }
  };

  const handleReplaceConfirm = async () => {
    if (!pendingItem || isProcessing) return;

    setIsProcessing(true);
    try {
      // Remove ALL cart items
      for (const item of cartItems) {
        await api.delete(`/cart/items/${item.id}`, {
          data: {
            reason: "Replacing metals with product",
          },
        });
      }

      // Add new product
     const prod= await api.post("/cart/add", {
        type: pendingItem.type,
        productId: pendingItem.productId,
        quantity: pendingItem.quantity,
      });
        
      // Refresh cart
      await fetchCart();
      toast.success("Cart updated");
      setShowReplaceModal(false);
      setPendingItem(null);
      navigate("/cart");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to replace cart"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 30,
    },

    animate: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    initial: {
      opacity: 0,
      y: 40,
    },

    animate: (index) => ({
      opacity: 1,
      y: 0,

      transition: {
        delay: index * 0.07,
        duration: 0.45,
        ease: "easeOut",
      },
    }),
  };

  const drawerVariants = {
    closed: {
      x: "-100%",
    },

    open: {
      x: 0,

      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  if (loading) {
    return(
    <div className="animate-pulse grid  grid-cols-1 md:grid-cols-3 gap-3 mt-10 m-20 p-4">
    <div className="h-50 bg-secondary/8 rounded-lg w-full"></div>
    <div className="h-50 bg-secondary/7 rounded-lg w-full"></div>
    <div className="h-50 bg-secondary/7 rounded-lg w-full"></div>
    <div className="h-50 bg-secondary/7 rounded-lg w-full"></div>
    <div className="h-50 bg-secondary/7 rounded-lg w-full"></div>
    <div className="h-50 bg-secondary/7 rounded-lg w-full"></div>
    <div className="h-50 bg-secondary/7 rounded-lg w-full"></div>
    <div className="h-50 bg-secondary/7 rounded-lg w-full"></div>
    <div className="h-50 bg-secondary/7 rounded-lg w-full"></div>
  </div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Backdrop */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() =>
              setFilterOpen(false)
            }
          />
        )}
      </AnimatePresence>

      {/* Filter Drawer */}
      <motion.div
        variants={drawerVariants}
        initial="closed"
        animate={
          filterOpen ? "open" : "closed"
        }
        className="fixed top-0 left-0 h-full w-[300px] bg-white text-background z-50 p-6 overflow-y-auto shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-serif">
            Filters
          </h2>

          <button
            onClick={() =>
              setFilterOpen(false)
            }
            className="p-1.5 rounded-full hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <label className="text-xs font-serif text-gray-500 uppercase tracking-wider mb-1 block">
            Search
          </label>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-700" />

            <input
              placeholder="Search product..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              className="w-full pl-8 pr-3 py-2 text-sm border rounded-lg"
            />
          </div>
        </div>

        {/* Clear Filters */}
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="w-full py-2.5 bg-background text-white rounded-xl"
          >
            Clear All Filters
          </button>
        )}
      </motion.div>

      {/* Main */}
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-white/70">
              Redeem <span className="text-primary">Jewellery</span> 
            </h1>

            
          </div>

          <div className="flex justify-end mb-6">
            <button
              onClick={() =>


                setFilterOpen(true)
              }
              className="flex items-center gap-2 border bg-primaryGoldGradient  text-background  px-4 py-2 rounded-lg"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p>No Products Found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(
                (product, index) => (
                  <motion.div
                    key={product.id}
                    custom={index}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    className="bg-white rounded-xl shadow-sm overflow-hidden text-background"
                  >
                    <div
                      className="h-48 w-full p-4 cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/productdetails/${product.id}`
                        )
                      }
                    >
                      <img
                        src={
                          product.image ||
                          "/placeholder.png"
                        }
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="font-medium">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {product.category ||
                          "--"}
                      </p>

                      <p className="font-bold text-lg mt-2">
                        ₹
                        {(
                          product.metalPrice || 0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                      <button
                        onClick={() =>
                          handleAddToCart(
                            product
                          )
                        }
                        className="w-full mt-4 bg-primaryGoldGradient  text-background py-2 rounded-lg flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Replace Modal */}
      {showReplaceModal &&
        pendingItem && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
              <h2 className="text-lg font-semibold mb-2">
                Clear Cart?
              </h2>

              <p className="text-sm text-gray-600 mb-4">
                Your cart currently has:
              </p>

              <div className="bg-amber-50 rounded-lg p-3 mb-6 max-h-40 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="text-sm text-gray-700 py-1.5 border-b border-yellow-200 last:border-b-0"
                  >
                    • {item.name}
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-600 mb-6">
                All digital metals will be removed
                and replaced with{" "}
                <strong>
                  {pendingItem.name}
                </strong>
                .
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowReplaceModal(
                      false
                    );

                    setPendingItem(null);
                  }}
                  className="flex-1 py-3 border rounded-xl"
                >
                  Cancel
                </button>

                <button
                  onClick={
                    handleReplaceConfirm
                  }
                  disabled={isProcessing}
                  className={`flex-1 py-3 rounded-xl transition ${
                    isProcessing
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {isProcessing
                    ? "Processing..."
                    : "Clear & Replace"}
                </button>
              </div>
            </div>
          </div>
        )}
    </motion.div>
  );
}

export default Redeem;