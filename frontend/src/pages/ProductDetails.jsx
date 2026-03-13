import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { jewelleryProducts } from "./Data/jewelleryProducts";
import { useCart } from "../components/CartContext";
import { toast } from "react-toastify";
import {ArrowLeft,ShoppingCart,Weight,Tag,Gem,Shield,Truck,RefreshCw,ChevronLeft,ChevronRight,Star,ZoomIn,} from "lucide-react";

function getGallery(product) {
  if (product.images && product.images.length > 0) return product.images;

  const base = product.image;
  return [
    { url: base, label: "Front View" },
    { url: base, label: "Left View" },
    { url: base, label: "Right View" },
    { url: base, label: "Back View" },
  ];
}

function getSimilar(product, all) {
  return all
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.type === product.type || p.category === product.category)
    )
    .slice(0, 4);
}

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const product = jewelleryProducts.find((p) => p.id === Number(id));

  const [activeImg, setActiveImg] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const handleAddToCart = (p) => {
    addToCart({ ...p, quantity: 1, totalPrice: p.price });
    toast.success(`${p.name} added to cart!`);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#f7f3eb] via-[#f0ece0] to-[#ede8da]">
        <div className="rounded-3xl p-12 text-center shadow-md max-w-sm w-full bg-white">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 bg-yellow-100">
            <Gem className="w-6 h-6 text-yellow-600" />
          </div>

          <h2 className="text-3xl font-semibold mb-2">Product Not Found</h2>

          <p className="text-sm mb-6 text-gray-600">
            This item doesn't exist or has been removed.
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
  const similar = getSimilar(product, jewelleryProducts);

  const prevImg = () =>
    setActiveImg((i) => (i === 0 ? gallery.length - 1 : i - 1));

  const nextImg = () =>
    setActiveImg((i) => (i === gallery.length - 1 ? 0 : i + 1));

  const specs = [
    { icon: Weight, label: "Weight", value: `${product.weight}g` },
    { icon: Gem, label: "Purity", value: product.purity },
    { icon: Tag, label: "Shape", value: product.shape },
    { icon: Tag, label: "Type", value: product.productType },
    { icon: Star, label: "Category", value: product.category },
     { icon: Star, label: "Hallmark", value: product.category },
  ].filter((s) => s.value);

  return (
   <>
      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <img
            src={gallery[activeImg].url || gallery[activeImg]}
            className="max-h-[90%]"
          />
        </div>
      )}

     <div className="min-h-screen max-w-full font-serif py-8 px-4 overflow-x-hidden lg:px-10 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}

          <button
            onClick={() => navigate("/redeem")}
            className="inline-flex items-center gap-2 mb-6 text-xs uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Back to Jewellery
          </button>

          {/* Main Grid */}

          <div className="grid lg:grid-cols-2 gap-8 mb-14">
            {/* LEFT IMAGES */}

            <div className="space-y-3 w-full">
              <div className="relative rounded-3xl overflow-hidden shadow-md group bg-yellow-700/10 border border-yellow-500/30">
                <img
                  src={gallery[activeImg].url || gallery[activeImg]}
                  alt={product.name}
                  className="w-full object-cover"/>

                {/* label */}

                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs uppercase tracking-widest bg-white/90 backdrop-blur text-yellow-500/90">
                  {gallery[activeImg].label}
                </div>

                {/* metal badge */}

                <div
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-semibold ${
                    isGold
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-400 text-black"
                  }`}
                >
                  {isGold ? "24K Gold" : ".999 Silver"}
                </div>

                {/* zoom */}

                <button
                  onClick={() => setZoomed(true)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-white shadow"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                {/* arrows */}

                <button
                  onClick={prevImg}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={nextImg}
                  className="absolute right-3 top-1/2-translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* thumbnails */}

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
                    <img src={img.url || img} className="w-full" />
                  </button>
                ))}
              </div>

              {/* trust */}

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


            {/* RIGHT SIDE */}

            <div className="rounded-2xl p-6 sm:p-8 shadow-md bg-white md:h-full md:w-109 md:ml-25 md:py-3">
              <h1 className="text-xl font-serif font-bold uppercase mb-2">{product.name}</h1>

              <p className="text-2xl font-bold text-yellow-600 mb-2">
                ₹{product.price.toLocaleString("en-IN")}
              </p>

              <p className="text-xs text-gray-500 mb-6">
                Inclusive of GST
              </p>

              {/* specs */}

              <div className="grid grid-cols-2 lg:grid lg:grid-cols-3 md:grid gap-3 mb-6">
                {specs.map((s, i) => {
                  const Icon = s.icon;

                  return (
                    <div
                      key={i}
                      className="rounded-xl px-4 py-3 bg-white border border-yellow-500/10 text-xl"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <Icon className="w-3 h-3 text-yellow-600" />

                        <span className="text-xs uppercase tracking-widest text-gray-500">
                          {s.label}
                        </span>
                      </div>

                      <p className="text-sm font-semibold">{s.value}</p>
                    </div>
                  );
                })}
              </div>

              {/* description */}
              <div className="font-serif font-bold text-xl mb-3"><p>About this product</p> </div>
 {product.description && (
                <p className="text-sm text-gray-600 mb-8 font-serif">
                  {product.description}
                </p>
              )}
             

              {/* add cart */}

              <button
                onClick={() => handleAddToCart(product)}
                className={`w-full py-4 rounded-xl text-lg uppercase tracking-widest font-semibold flex items-center justify-center gap-2 lg:mb-2 ${
                  isGold
                    ? "w-full py-3 px-4 rounded-xl text-sm  tracking-widest font-semibold bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950 shadow-lg shadow-amber-600/30 mb-5"
                    : "bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 text-black"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>

          {/* similar */}

          {similar.length > 0 && (
            <section>
              
              <div className="text-xl md:text-3xl lg:text-3xl font-serif font-semibold text-center mb-8 flex justify-center items-center gap-2">
                <span>     <div className=" w-30 h-0.5 md:h-0.5 md:w-60 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-3 flex justify-center items-center"></div></span>
                <span className=" font-serif font-semibold bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
               Similar
                </span>
                <span className="font-serif font-semibold">
                Pieces
                </span>
                <span><div className=" w-30 h-0.5 md:h-0.5 md:w-60 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mb-3 flex justify-center items-center"></div></span>
                
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 ">
                {similar.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/productdetails/${item.id}`)}
                    className="rounded-3xl overflow-hidden shadow-sm bg-white cursor-pointer "
                  >
                    <div className="h-[70px] md:h-[90px] bg-yellow-100 mt-0">
                      <img
                        src={item.image}
                        className="w-full h-full object-contain p-1 m-1"
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
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                        className="w-full py-2 rounded-xl text-xs px-4  tracking-widest font-semibold
              bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950
              shadow-lg shadow-amber-600/30
              mb-5 text-black flex items-center justify-center gap-1"
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
