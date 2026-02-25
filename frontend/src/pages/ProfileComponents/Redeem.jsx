import { useState } from "react";
import { useCart } from "../../components/CartContext";
import { jewelleryProducts } from "../Data/jewelleryProducts";
import { toast } from "react-toastify";

function Redeem() {
  const { addToCart } = useCart();
  const [metalType, setMetalType] = useState("gold");

  const [filters, setFilters] = useState({
    shape: "",
    productType: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    minWeight: "",
    maxWeight: "",
  });

  // Get unique filter options dynamically
  const uniqueShapes = [
    ...new Set(jewelleryProducts.map((p) => p.shape)),
  ];
  const uniqueProductTypes = [
    ...new Set(jewelleryProducts.map((p) => p.productType)),
  ];
  const uniqueCategories = [
    ...new Set(jewelleryProducts.map((p) => p.category)),
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
  };

  const filteredProducts = jewelleryProducts.filter((product) => {
    return (
      product.type === metalType &&
      (filters.shape === "" || product.shape === filters.shape) &&
      (filters.productType === "" ||
        product.productType === filters.productType) &&
      (filters.category === "" || product.category === filters.category) &&
      
      (filters.minPrice === "" ||
        product.price >= Number(filters.minPrice)) &&
      (filters.maxPrice === "" ||
        product.price <= Number(filters.maxPrice)) &&
      (filters.minWeight === "" ||
        product.weight >= Number(filters.minWeight)) &&
      (filters.maxWeight === "" ||
        product.weight <= Number(filters.maxWeight))
    );
  });

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      quantity: 1,
      totalPrice: product.price,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 md:p-8 text-white">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-10 text-center">
          Gold & Silver Jewellery
        </h1>

        {/* Metal Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          {["gold", "silver"].map((metal) => (
            <button
              key={metal}
              onClick={() => setMetalType(metal)}
              className={`px-8 py-3 rounded-xl font-semibold transition ${
                metalType === metal
                  ? "bg-secondary text-accent shadow-lg scale-105"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}>

              {metal.charAt(0).toUpperCase() + metal.slice(1)}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-slate-800 p-6 rounded-2xl mb-10 grid grid-cols-2 md:grid-cols-4 gap-4">

          <select
            name="shape"
            value={filters.shape}
            onChange={handleFilterChange}
            className="p-2 rounded bg-slate-700">
            <option value="">All Shapes</option>
            {uniqueShapes.map((shape, index) => (
            <option key={index} value={shape}>
                {shape}
              </option>
            ))}
          </select>
{/* 
          <select
            name="productType"
            value={filters.productType}
            onChange={handleFilterChange}
            className="p-2 rounded bg-slate-700"
          >
            <option value="">All Product Types</option>
            {uniqueProductTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="p-2 rounded bg-slate-700"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select> */}

          
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="p-2 rounded bg-slate-700"/>

          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="p-2 rounded bg-slate-700" />

          <input
            type="number"
            name="minWeight"
            placeholder="Min Weight (g)"
            value={filters.minWeight}
            onChange={handleFilterChange}
            className="p-2 rounded bg-slate-700"
          />

          <input
            type="number"
            name="maxWeight"
            placeholder="Max Weight (g)"
            value={filters.maxWeight}
            onChange={handleFilterChange}
            className="p-2 rounded bg-slate-700"
          />

          <button onClick={clearFilters}
            className="bg-white text-accent hover:bg-red-700 rounded p-2">
            Clear Filters
          </button>
        </div>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl text-slate-400">
              No products found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-yellow-900/20 border border-yellow-500/30 rounded-2xl 
                overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                <div className="bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-secondary mb-2">
                    {product.name}
                  </h3>

                  <p className="text-slate-400 text-sm mb-4">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-slate-300">
                      {product.weight}g
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-secondary hover:bg-secondary/90
                    text-accent font-semibold py-3 rounded-xl transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Redeem;
