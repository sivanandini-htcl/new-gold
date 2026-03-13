import { useWishlist } from "../components/WishlistContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { toast } from "react-toastify";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    addToCart({ ...item, quantity: 1, totalPrice: item.price});
    toast.success(`${item.name} added to cart!`);
  };

  const handleRemove = (e, id) => {
    e.stopPropagation();
    removeFromWishlist(id);
    toast.info("Removed from wishlist");
  };

  return (
    <>     
      <div className="wl-root min-h-screen py-8 px-4 sm:px-6 lg:px-10 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100 ">
        <div className="max-w-6xl mx-auto">

          {/* ── Page Title ── */}
          <div className="mb-2 text-center fade-in gap-2">
            <div className="divider-gold h-0.5 w-16 rounded-full mx-auto mb-2"/>
            <div className="flex justify-center text-center gap-3 items-center">
              <h1 className="heading-font text-5xl md:text-6xl font-bold mb-1 font-serif text-black gap-2 text-center ">
              My 
             </h1>
            <span>
              <h1 className="heading-font text-5xl md:text-6xl font-bold mb-1 font-serif bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950
               bg-clip-text text-transparent gap-2 text-center">
              Wishlist 
              </h1>
            </span>         
            </div>
            
            <p className="text-xs uppercase tracking-widest mt-1">
              {wishlist.length} {wishlist.length === 1 ? "piece" : "pieces"} saved
            </p>
          </div>

          {/* ── Empty State ── */}
          {wishlist.length === 0 ? (
            <div className="fade-in flex flex-col items-center justify-center py-20">
              <div className="rounded-3xl p-12 text-center shadow-md max-w-sm w-full bg-white"
  >
                <div className="divider-gold h-0.5 w-12 rounded-full mx-auto mb-6"/>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 bg-[#e2ceb2]" >
                  <Heart className="w-7 h-7 heart-pulse text-red-800 animate-heartbeat ease-in-out"/>
                </div>
                <h2 className="heading-font text-3xl font-serif font-semibold mb-2 text-[#945c14] ">
                  Nothing saved yet
                </h2>
                <p className="text-sm mb-8 leading-relaxed font-serif text-[#72552f]" >
                  Browse our jewellery collection and save the pieces you love.
                </p>
                <button onClick={() => navigate("/redeem")}
                  className="w-full py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold transition hover:opacity-90 inline-flex items-center justify-center gap-2 text-[#72552f]">
                  Browse Jewellery<ArrowRight className="w-4 h-4" />
                </button>
                <div className="divider-gold h-0.5 w-8 rounded-full mx-auto mt-6" />
              </div>
            </div>
          ) : (
            <>
              {/* ── Grid ── */}
              <div className="grid grid-cols-1 sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlist.map((item, index) => {
                  const isGold = item.type === "gold";
                  return (
                    <div key={item.id}
                      className="bg-white rounded-xl shadow-sm  overflow-hidden border  border-amber-700/20 "
                     
                      onClick={() => navigate(`/productdetails/${item.id}`)}>
                      {/* Image */}
                      <div className="h-38 md:h-48 w-full bg-yellow-700/10 cursor-pointer" >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                          onError={e => e.target.src = "https://via.placeholder.com/180?text=No+Image"}
                        />

                        {/* Metal badge */}
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full"   >
                          {isGold ? "Gold" : "Silver"}
                        </div>

                        {/* Remove (heart) button */}
                        <button
                          onClick={(e) => handleRemove(e, item.id)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition hover:scale-110"     
                          title="Remove from wishlist"
                        >
                          <Heart className="w-10 h-3.5 bg-red-600"   />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <div className="h-0.5 w-6 rounded-full mb-2"/>

                        <h3 className="font-semibold cursor-pointer">{item.name}</h3>

                        {item.weight && (
                          <p className="text-sm text-gray-500 mb-1">{item.weight}g</p>
                        )}

                        <p className={`font-bold text-lg mb-3 ${isGold ? "gold-shimmer-text" : "silver-shimmer-text"}`}>
                          ₹{item.price.toLocaleString("en-IN")}
                        </p>

                        {/* Buttons row */}
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => handleAddToCart(e, item)}
                            className="w-full bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950
                            shadow-lg shadow-amber-600/30 py-2 rounded-lg text-sm mb-2 flex items-center justify-center gap-2 hover:scale-100 active:scale-50 transition duration-100" >
                            <ShoppingCart className="w-4 h-4" />
                            Add
                          </button>

                          <button
                            onClick={(e) => handleRemove(e, item.id)}
                            className="w-9 h-9 rounded-xl flex items-center justify-center transition hover:opacity-80 shrink-0"
                         
                            title="Remove">
                              <div className="bg-red-100 w-15 h-9 flex items-center justify-center border border-red-300 rounded-xl">
                              <Trash2 className="w-4 text-center h-4 text-red-900"  />
                              </div>
                      
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ── Bottom CTA ── */}
              <div className="text-center">
                <button
                  onClick={() => navigate("/redeem")}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest transition">
                  <ArrowRight className="w-4 h-4" />
                  Continue Browsing
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}

export default Wishlist;