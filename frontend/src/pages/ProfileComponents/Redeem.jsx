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
import Wishlist from "../Wishlist";

function Redeem() {
  const { addToCart } = useCart();
  const { addToWishlist ,isWishlisted} = useWishlist();
  
  const navigate = useNavigate();

  const [metalType, setMetalType] = useState("gold");
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [active, isActive] = useState(false);

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

  const uniqueShapes = [
    ...new Set(jewelleryProducts.map((p) => p.shape).filter(Boolean)),
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
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
    Object.values(filters).filter(Boolean).length + (searchQuery ? 1 : 0);

  const filteredProducts = jewelleryProducts
    .filter(
      (p) =>
        p.type === metalType &&
        (filters.shape === "" || p.shape === filters.shape) &&
        (filters.productType === "" ||
          p.productType === filters.productType) &&
        (filters.category === "" || p.category === filters.category) &&
        (filters.minPrice === "" || p.price >= Number(filters.minPrice)) &&
        (filters.maxPrice === "" || p.price <= Number(filters.maxPrice)) &&
        (filters.minWeight === "" || p.weight >= Number(filters.minWeight)) &&
        (filters.maxWeight === "" || p.weight <= Number(filters.maxWeight)) &&
        (searchQuery === "" ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "weight_asc") return a.weight - b.weight;
      if (sortBy === "weight_desc") return b.weight - a.weight;
      return 0;
    });

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1, totalPrice: product.price });
    toast.success(`${product.name} added to cart!`);
  };

  const isGold = metalType === "gold";

  return (
    <>
      {/* Overlay */}
      {filterOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 "
          onClick={() => setFilterOpen(false)}
        />
      )}

      {/* Filter Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px]  bg-white  z-50 p-6 overflow-y-auto transition-transform ${
          filterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <SlidersHorizontal className="w-4 h-4 text-yellow-600" />
            Filters
          </div>

          <button onClick={() => setFilterOpen(false)}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <label className="text-xs uppercase text-gray-500 mb-1 block">
            Search
          </label>

          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search jewellery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-amber-700/20 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Sort */}
        <div className="mb-6">
          <label className="text-xs uppercase text-gray-500 mb-1 block">
            Sort By
          </label>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border  border-amber-700/20  rounded-lg py-2 px-3 text-sm appearance-none" >
              <option value="">Default</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="weight_asc">Weight: Lightest</option>
              <option value="weight_desc">Weight: Heaviest</option>
            </select>

            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Shape */}
        <div className="mb-6">
          <label className="text-xs uppercase text-gray-500 mb-1 block">
            Shape
          </label>

          <select
            name="shape"
            value={filters.shape}
            onChange={handleFilterChange}
            className="w-full border  border-amber-700/20  rounded-lg py-2 px-3 text-sm"
          >
            <option value="">All Shapes</option>

            {uniqueShapes.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="text-xs uppercase text-gray-500 mb-1 block">
            Price Range
          </label>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="border  border-amber-700/20  rounded-lg py-2 px-3 text-sm"
            />

            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="border border-amber-700/20  rounded-lg py-2 px-3 text-sm"
            />
          </div>
        </div>

        {/* Weight */}
        <div className="mb-6">
          <label className="text-xs uppercase text-gray-500 mb-1 block">
            Weight Range
          </label>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              name="minWeight"
              placeholder="Min"
              value={filters.minWeight}
              onChange={handleFilterChange}
              className="border  border-amber-700/20  rounded-lg py-2 px-3 text-sm"
            />

            <input
              type="number"
              name="maxWeight"
              placeholder="Max"
              value={filters.maxWeight}
              onChange={handleFilterChange}
              className="border  border-amber-700/20  rounded-lg py-2 px-3 text-sm"
            />
          </div>
        </div>

        <button
          onClick={clearFilters}
          className="w-full border  border-amber-700/20  rounded-lg py-2 text-sm bg-gray-100">
          Clear Filters
        </button>
      </div>

      {/* Page */}
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100 py-8 px-4">
  <div className="max-w-7xl mx-auto">

          {/*   title change*/}
          <div className="text-center mb-10">
            {/* <h1 className="text-4xl font-bold mb-2">
              {isGold ? "Gold": "Silver"} Jewellery
            </h1> */}


{isGold?(
  <div className="flex gap-2 justify-center font-serif ">
<span className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent" >Gold</span>
<span className="text-4xl font-bold mb-2">Jewellery</span>

  </div>
):(
  <div className="flex gap-2 justify-center font-serif">
    <span className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-700 via-gray-400/80 to-gray-900 bg-clip-text text-transparent">Silver</span>
<span className="text-4xl font-bold mb-2">Jewellery</span>
  </div>
)}

            <p className="text-sm text-gray-500">
              Redeem your digital holdings
            </p>
          </div>

       
          <div className="flex items-center justify-between mb-6 gap-3 ">

            <div className="flex  rounded-xl overflow-hidden gap-1 bg-amber-700/10">

              <button
                onClick={() => setMetalType("gold")}
                className={`px-6 py-2 text-sm ${
                  metalType === "gold"
                    ? "bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950 shadow-lg shadow-amber-600/30 rounded-xl text-black"
                    : "bg-white rounded-xl"}`}>
                Gold               
              </button>

              <button
                onClick={() => setMetalType("silver")}
                className={`px-6 py-2 text-sm ${
                  metalType === "silver"
                    ? "bg-gradient-to-r from-gray-700 via-gray-200 to-gray-600 text-gray-900 rounded-xl "
                    : "bg-white rounded-xl"
                }`}
              >
                Silver
              </button>
            </div>

            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 border  border-amber-700/20  px-4 py-2 rounded-lg text-sm" >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-yellow-500 text-xs px-2 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Products */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg mb-4">No Products Found</p>

              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-yellow-500 rounded-lg">
                Clear Filters
              </button>
            </div>
          ) : (
            // image div size in mobile view
            <div className="grid grid-cols-1 sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 "> 
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm  overflow-hidden border  border-amber-700/20 "
                >
                  
                  <div
                    className="h-38 md:h-48 w-full bg-yellow-700/10 cursor-pointer"
                    onClick={() =>
                      navigate(`/productdetails/${product.id}`)
                    }
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain " />
                  </div>

                  {/* Info */}
                  <div className="p-4">

                    <h3
                      onClick={() =>
                        navigate(`/productdetails/${product.id}`)
                      }
                      className="font-semibold cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-500 mb-1">
                      {product.weight}g
                    </p>
                    <p className="font-bold text-lg mb-3">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950
              shadow-lg shadow-amber-600/30 py-2 rounded-lg text-sm mb-2 flex items-center justify-center gap-2
              hover:scale-100 active:scale-50 transition duration-100 " >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>

              <button
  onClick={() => addToWishlist(product)}
  className="w-full py-2 rounded-lg text-sm flex items-center justify-center gap-2 border border-amber-700/20 
  hover:scale-100 active:scale-50 transition duration-100"
>
  <Heart
    className={`w-4 h-4 ${isWishlisted ? "text-red-500 fill-red-500" : "text-gray-500"}`}
  />
  Wishlist
</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Redeem;