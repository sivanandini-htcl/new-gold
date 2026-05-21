import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api/axiosInstance";

import {
  ArrowLeft,
  ShoppingCart,
  Weight,
  Tag,
  Gem,
  Shield,
  Truck,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Star,
  ZoomIn,
  Loader2,
} from "lucide-react";

function getGallery(product) {
  if (product?.images && product.images.length > 0) {
    return product.images;
  }

  const base = product?.image;

  return [
    { url: base, label: "Front View" },
    { url: base, label: "Left View" },
    { url: base, label: "Right View" },
    { url: base, label: "Back View" },
  ];
}

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeImg, setActiveImg] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/products/public/${id}`);

        console.log("PRODUCT RESPONSE:", res.data);

        const productData = res.data?.data || res.data;

        setProduct(productData);

        // SIMILAR PRODUCTS
        // const similarRes = await api.get("/products/public");

        // const allProducts =
        //   similarRes.data.products || similarRes.data || [];

        // const filtered = allProducts
        //   .filter(
        //     (p) =>
        //       p._id !== productData._id &&
        //       (p.category === productData.category ||
        //         p.type === productData.type)
        //   )
        //   .slice(0, 4);

        // setSimilar(filtered);
      } catch (err) {
        console.log("PRODUCT ERROR:", err);
        console.log("FULL ERROR:", err);
        console.log("RESPONSE:", err.response);
        console.log("DATA:", err.response?.data);
        console.log("MESSAGE:", err.response?.data?.message);

        setError(
          err.response?.data?.message || "Failed to fetch product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (p) => {
    console.log("ADD TO CART:", p);

    toast.success(`${p.name} added to cart!`);
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-yellow-600" />
      </div>
    );
  }

  // ERROR
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#f7f3eb] via-[#f0ece0] to-[#ede8da]">
        <div className="rounded-3xl p-12 text-center shadow-md max-w-sm w-full bg-white">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 bg-yellow-100">
            <Gem className="w-6 h-6 text-yellow-600" />
          </div>

          <h2 className="text-3xl font-semibold mb-2">
            Product Not Found
          </h2>

          <p className="text-sm mb-6 text-gray-600">
            {error || "This item doesn't exist or has been removed."}
          </p>

          <button
            onClick={() => navigate("/redeem")}
            className="w-full py-3 rounded-xl text-sm uppercase tracking-widest font-semibold bg-yellow-500 text-black hover:opacity-90"
          >
            Browse Jewellery
          </button>
        </div>
      </div>
    );
  }

  const isGold = product.type === "gold";

  const gallery = getGallery(product);

  const prevImg = () =>
    setActiveImg((i) => (i === 0 ? gallery.length - 1 : i - 1));

  const nextImg = () =>
    setActiveImg((i) => (i === gallery.length - 1 ? 0 : i + 1));

  const specs = [
    {
      icon: Weight,
      label: "Weight",
      value: `${product.weight || 0}g`,
    },
    {
      icon: Gem,
      label: "Purity",
      value: product.purity,
    },
    {
      icon: Tag,
      label: "Shape",
      value: product.shape,
    },
    {
      icon: Tag,
      label: "Type",
      value: product.metalType,
    },
    {
      icon: Star,
      label: "Category",
      value: product.category,
    },
    {
      icon: Star,
      label: "Hallmark",
      value: product.hallmark,
    },
     {
      icon: Star,
      label: "Hallmark",
      value: product.certification,
    },
    //  {
    //   icon: Star,
    //   label: "Stock",
    //   value: product.stockStatus,
    // },
  ].filter((s) => s.value);

  return (
    <>
      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <img
            src={gallery[activeImg]?.url || gallery[activeImg]}
            className="max-h-[90%]"
          />
        </div>
      )}

      <div className="min-h-screen max-w-full font-serif py-8 px-4 overflow-x-hidden lg:px-10 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* BACK */}
          <button
            onClick={() => navigate("/redeem")}
            className="inline-flex items-center gap-2 mb-6 text-xs uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jewellery
          </button>

          {/* MAIN */}
          <div className="grid lg:grid-cols-2 gap-8 mb-14">
            {/* LEFT */}
            <div className="space-y-3 w-full">
              <div className="relative rounded-3xl overflow-hidden shadow-md group bg-yellow-700/10 border border-yellow-500/30">
                <img
                  src={gallery[activeImg]?.url || gallery[activeImg]}
                  alt={product.name}
                  className="w-full object-cover"
                />

                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs uppercase tracking-widest bg-white/90 backdrop-blur text-yellow-500/90">
                  {gallery[activeImg]?.label}
                </div>

                <div
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-semibold ${
                    isGold
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-400 text-black"
                  }`}
                >
                  {isGold ? "24K Gold" : ".999 Silver"}
                </div>

                <button
                  onClick={() => setZoomed(true)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-white shadow"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <button
                  onClick={prevImg}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={nextImg}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* THUMBNAILS */}
              <div className="grid grid-cols-4 gap-2">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`rounded-2xl overflow-hidden border ${
                      i === activeImg
                        ? "border-yellow-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img.url || img}
                      className="w-full"
                    />
                  </button>
                ))}
              </div>

              {/* TRUST */}
              <div className="flex justify-between text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  BIS Hallmarked
                </div>

                <div className="flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  Free Delivery
                </div>

                <div className="flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  Easy Returns
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="rounded-2xl p-6 sm:p-8 shadow-md bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20">
              <h1 className="text-xl text-primary font-serif font-bold uppercase mb-2">
                {product.name}
              </h1>

              <p className="text-2xl font-bold text-white/70 mb-2">
                ₹{Number(product.metalPrice).toLocaleString("en-IN")}
              </p>

              <p className="text-xs text-gray-500 mb-6">
                Inclusive of GST
              </p>

              {/* SPECS */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {specs.map((s, i) => {
                  const Icon = s.icon;

                  return (
                    <div
                      key={i}
                      className="rounded-xl px-4 py-3 bg-[#111117]"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <Icon className="w-3 h-3 text-primary/70" />

                        <span className="text-xs uppercase tracking-widest text-gray-500">
                          {s.label}
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-secondary">
                        {s.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* DESCRIPTION */}
              <div className="font-serif font-bold text-xl text-secondary mb-3">
                About this product
              </div>

              {product.description && (
                <p className="text-sm text-gray-600 mb-8 font-serif">
                  {product.description}
                </p>
              )}

              {/* ADD CART */}
              <button
                onClick={() => handleAddToCart(product)}
                className={`w-full py-4 rounded-xl text-lg uppercase tracking-widest font-semibold flex items-center justify-center gap-2 ${
                  isGold
                    ? "bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 shadow-lg shadow-amber-600/30 text-background"
                    : "bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 text-background"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>

          {/* SIMILAR */}
          {similar.length > 0 && (
            <section>
              <div className="text-xl md:text-3xl lg:text-3xl font-serif font-semibold text-center mb-8 flex justify-center items-center gap-2">
                <span className="font-serif font-semibold bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                  Similar
                </span>

                <span className="font-serif font-semibold">
                  Pieces
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {similar.map((item) => (
                  <div
                    key={item._id}
                    onClick={() =>
                      navigate(`/productdetails/${item._id}`)
                    }
                    className="rounded-3xl overflow-hidden shadow-sm bg-white cursor-pointer"
                  >
                    <div className="h-[70px] md:h-[90px] bg-yellow-100">
                      <img
                        src={item.image}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>

                    <div className="p-4 text-xs">
                      <h3 className="font-semibold truncate">
                        {item.name}
                      </h3>

                      <p className="text-xs text-gray-500 mb-1">
                        {item.weight}g
                      </p>

                      <p className="font-bold font-sans mb-3">
                        ₹
                        {Number(item.price).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                        className="w-full py-2 rounded-xl text-xs px-4 tracking-widest font-semibold bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 shadow-lg shadow-amber-600/30 text-black flex items-center justify-center gap-1"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductDetails;