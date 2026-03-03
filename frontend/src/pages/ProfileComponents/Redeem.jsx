import React, { useState } from "react";
import { useCart } from "../../components/CartContext";
import { jewelleryProducts } from "../Data/jewelleryProducts";
import { toast } from "react-toastify";
import {SlidersHorizontal,}from "lucide-react"

function Redeem() {
  const { addToCart } = useCart();
  const [metalType, setMetalType] = useState("gold");
  const [isOpen, setIsOpen] = useState(false);
  

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
  // const uniqueProductTypes = [
  //   ...new Set(jewelleryProducts.map((p) => p.productType)),
  // ];
  // const uniqueCategories = [
  //   ...new Set(jewelleryProducts.map((p) => p.category)),
  // ];

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 p-6 md:p-8 text-black">
      <div className="max-w-7xl mx-auto">

 
{metalType === "gold" ? (
  <div className="mb-10 border-b border-yellow-700/20 pb-6 font-['Fraunces'] flex flex-col justify-center items-center  ">
          <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-3 flex justify-center items-center"></div>

          <h1 className="text-5xl font-['Fraunces'] bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent text-center">
          Gold
          </h1>
          </div>
) : (
   <div className="mb-10 border-b border-gray-700/20 pb-6 flex flex-col justify-center items-center">
          <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-3"></div>

          <h1 className="text-5xl  font-['Fraunces'] bg-gradient-to-r from-gray-700 via-gray-400 to-gray-900 font-serif bg-clip-text text-transparent">
          Silver
          </h1>
          </div>
)}

       <div className="mb-8 flex justify-center items-center gap-3  rounded-2xl">
  {["gold", "silver"].map((metal) => (
    <button
      key={metal}
      onClick={() => setMetalType(metal)}
      className={`px-8 py-3 rounded-xl font-semibold transition shadow-lg hover:scale-[1.02]
        ${
          metal === "gold"
            ? metalType === "gold"
?" py-3 mt-3 rounded-xl text-sm uppercase tracking-widest font-semibold bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-black shadow-lg shadow-amber-600/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300 mb-5"
          
              : "bg-white text-black"
              : metalType === "silver"
              ? "bg-gradient-to-r from-gray-700 via-gray-200 to-gray-600 text-gray-900 shadow-lg hover:scale-[1.02]"
              : "bg-white text-black"
        }
      `}
    >
      {metal.charAt(0).toUpperCase() + metal.slice(1)}
    </button>
  ))}
</div>
  
     <div className="hidden md:block bg-white  rounded-2xl shadow-sm p-2 sm:p-6 mb-10">

  {/* Header */}
  <div className="flex items-center gap-1 mb-5">
    <SlidersHorizontal className="text-amber-700" size={18} />
    <p className="uppercase text-sm sm:text-base tracking-wide font-serif">
      Filter Products
    </p>
  </div>


  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 font-['Fraunces'] ">

    {/* Shape */}
    <div className="flex flex-col">
      <label className="text-xs uppercase tracking-widest mb-1.5">
        Shape
      </label>
      <select
        name="shape"
        value={filters.shape}
        onChange={handleFilterChange}
        className="w-full p-2.5 rounded-xl bg-white border border-amber-400/70 focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        <option value="">All Shapes</option>
        {uniqueShapes.map((shape, index) => (
          <option key={index} value={shape}>
            {shape}
          </option>
        ))}
      </select>
    </div>

    {/* Min Price */}
    <div className="flex flex-col">
      <label className="text-xs uppercase tracking-widest mb-1.5">
        Min Price
      </label>
      <input
        type="number"
        name="minPrice"
        value={filters.minPrice}
        onChange={handleFilterChange}
        className="w-full p-2.5 rounded-xl bg-white border border-amber-400/70 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>

    {/* Max Price */}
    <div className="flex flex-col">
      <label className="text-xs uppercase tracking-widest mb-1.5">
        Max Price
      </label>
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleFilterChange}
        className="w-full p-2.5 rounded-xl bg-white border border-amber-400/70 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>

    {/* Min Weight */}
    <div className="flex flex-col">
      <label className="text-xs uppercase tracking-widest mb-1.5">
        Min Weight
      </label>
      <input
        type="number"
        name="minWeight"
        value={filters.minWeight}
        onChange={handleFilterChange}
        className="w-full p-2.5 rounded-xl bg-white border border-amber-400/70 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>

    {/* Max Weight */}
    <div className="flex flex-col">
      <label className="text-xs uppercase tracking-widest mb-1.5">
        Max Weight
      </label>
      <input
        type="number"
        name="maxWeight"
        value={filters.maxWeight}
        onChange={handleFilterChange}
        className="w-full p-2.5 rounded-xl bg-white border border-amber-400/70 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>

  </div>

  {/* Clear Button */}
  <div className="flex justify-center sm:justify-end mt-6">
    <button
      onClick={clearFilters}
      className="px-5 py-2 rounded-xl border border-amber-400/70 bg-white hover:bg-gray-100 transition">
      Clear Filters
    </button>
  </div>
</div>

<div>
  <div>
  <button 
            className="md:hidden w-9 h-9 flex items-center
            justify-center border border-yellow-300 rounded-full bg-white text-yellow-800"
            onClick={() => setIsOpen(!isOpen)}>

            {isOpen ? "x"  : <SlidersHorizontal size={18} />}
          </button>
        </div>
      </div>
 {isOpen && (
        <div className="md:hidden bg-white border-t border-yellow-200 shadow-lg text-sm mb-10">
          <div className="flex flex-col p-4 gap-4 text-sm uppercase tracking-wider text-yellow-800">
            <div className=" bg-white rounded-2xl shadow-sm p-2 sm:p-6 mb-10">

  {/* Header */}
  <div className="flex items-center gap-1 mb-5">
    <SlidersHorizontal className="text-amber-700" size={18} />
    <p className="uppercase  sm:text-base tracking-wide font-serif">
      Filter Products
    </p>
  </div>


  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 font-['Fraunces'] " >

    {/* Shape */}
    <div className="flex flex-col">
      <label className="text-xs uppercase tracking-widest mb-1.5">Shape</label>
 <select name="shape"
        value={filters.shape}
        onChange={handleFilterChange}
        className="w-full p-2.5 rounded-xl
         bg-white border border-amber-400/70 focus:outline-none focus:ring-2 focus:ring-amber-500" >
        <option value="">All Shapes</option>

        {uniqueShapes.map((shape, index) => (
          <option key={index} value={shape}>
            {shape}
          </option>
        ))}
      </select>
    </div>

    {/* Min Price */}
    <div className="flex flex-col">
      <label className="text-xs uppercase tracking-widest mb-1.5">
        Min Price</label>
      <input
        type="number"
        name="minPrice"
        value={filters.minPrice}
        onChange={handleFilterChange}
        className="w-full p-2.5 rounded-xl
         bg-white border border-amber-400/70 focus:outline-none focus:ring-2 focus:ring-amber-500"  />
    </div>

    {/* Max Price */}
    <div className="flex flex-col">
      <label className="text-xs uppercase tracking-widest mb-1.5"> Max Price</label>
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleFilterChange}
        className="w-full p-2.5
         rounded-xl bg-white border border-amber-400/70 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
    </div>

    {/* Min Weight */}
    <div className="flex flex-col">
      <label className="text-xs uppercase tracking-widest mb-1.5"> Min Weight </label>
      <input
        type="number"
        name="minWeight"
        value={filters.minWeight}
        onChange={handleFilterChange}
        className="w-full p-2.5 rounded-xl
         bg-white border border-amber-400/70 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
    </div>

    {/* Max Weight */}
    <div className="flex flex-col">
      <label className="text-xs uppercase tracking-widest mb-1.5"> Max Weight </label>
      <input
        type="number"
        name="maxWeight"
        value={filters.maxWeight}
        onChange={handleFilterChange}
        className="w-full p-2.5 rounded-xl
         bg-white border border-amber-400/70 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
    </div>

  </div>

  {/* Clear Button */}
  <div className="flex justify-center sm:justify-end mt-6">
    <button
      onClick={clearFilters}
      className="px-5 py-2 rounded-xl border border-amber-400/70 bg-white hover:bg-gray-100 transition" >
      Clear Filters
    </button>
  </div>
</div>
          </div>
        </div>
      )}
  
  </div>
  <div className="flex h-full  w-full"> 
        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl text-slate-400">
              No products found.
            </p>
          </div>
        ) : (
          <div className=" w-full h-full  grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 font-['Fraunces']  text-xs" >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-yellow-900/20  product-card rounded-3xl 
                overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-black/45 ">
               
                <div className=" md:w-full md:h-100 inline-block bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 py-10 px-4 lg:px-2  justify-center"> 
                  <img
                    src={product.image}
                    alt={product.name}
                    className=" flex w-full h-full object-cover  justify-center bg-bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100 py-10 px-4 lg:px-10"/>
                </div>

                <div className="p-2 md:p-5 bg-white shadow-xl h-full">
                  <h3 className=" md:text-xl font-serif text-gray-900 mb-2">
                    {product.name}
                  </h3>

                  <p className="text-black text-xs mb-4">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-black">
                      {product.weight}g
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full  hover:bg-secondary/90 bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800
                    text-gray-900 font-['Fraunces'] py-3 rounded-xl transition">
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
