import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, ArrowRight, Package, Heart } from "lucide-react";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalAmount } = useCart();
  const navigate = useNavigate();

  // ── Empty State ──
  if (cartItems.length === 0) {
    return (
      <>
        
        <div
          className="cart-root max-h-screen p-40 md:min-h-screen flex flex-col items-center justify-center px-0 py-1 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-50"
       
        >
          <div
            className="md:rounded-3xl p-9 shadow-lg text-center max-w-sm w-full bg-white"     
          >
            <div className=" h-0.5 w-12 rounded-full mx-auto mb-6" />
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
              <ShoppingCart size={80} className=" p-2 rounded-4xl text-yellow-700 hover:scale-125 active:scale-90 transition duration-200 animate-bounce"  />
              {/* <Heart className="text-red-500 hover:scale-125 active:scale-90 transition duration-300 animate-spin"/> */}
            </div>
            <h1 className="text-4xl font-serif mb-2" >
              Your Cart
            </h1>
            <p className="text-xs uppercase tracking-widest mb-6 font-serif" >
              No items yet
            </p>
            <p className="text-sm mb-8 font-serif" >
              Your cart is empty. Explore our jewellery collection and start adding pieces.
            </p>
            <button
              onClick={() => navigate("/redeem")}
              className="w-full py-3.5 rounded-xl  bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-sm uppercase tracking-widest font-serif transition hover:opacity-90 inline-flex items-center justify-center gap-2"
              
            >
              Browse Jewellery
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 h-0.5 w-10 rounded-full mx-auto mt-6" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      

      <div
        className="cart-root min-h-screen py-8 px-4 sm:px-6 lg:px-10 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-50"
      >
        <div className="max-w-4xl mx-auto">

          {/* ── Page Title ── */}
          <div className="mb-8 text-center" >
            <div className=" h-0.5 w-16 rounded-full mx-auto mb-4" />
            <h1 className=" text-2xl md:text-5xl font-bold mb-1">
              <span className=" md:font-bold font-serif bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">Shopping</span>
              <span className=" font-serif text-black"> Cart</span>
            </h1>
            <p className="text-xs uppercase tracking-widest mt-3 text-yellow-800/70">
              {totalItems} {totalItems === 1 ? "item" : "items"} · Jewellery Redemption
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            {/* ── Cart Items ── */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="cart-item-card rounded-3xl overflow-hidden shadow-xl bg-white" 
                  >
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-5 ">

                    {/* Image */}
                    <div
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0"onClick={()=>{navigate(`/productdetails/${item.id}`)}}    
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover bg-amber-100 "
                        onError={(e) => { e.target.src = "https://via.placeholder.com/128?text=No+Image"; }}
                      />
                    </div>
                   

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      {/* accent line */}
                      <div className="h-0.5 w-8 rounded-full mb-2"/>
                      <h3 className=" text-lg  font-serif mb-1 truncate" >
                        {item.name}
                      </h3>
                      <p className="text-xs font-medium uppercase tracking-widest mb-2  text-yellow-800/70" >
                        {item.purity && `${item.purity} · `}{item.weight}g
                      </p>
                      <p className="text-sm font-semibold mb-4  text-yellow-800/70" >
                        ₹{item.price.toLocaleString("en-IN")} / piece
                      </p>

                      {/* Quantity & Remove */}
                      <div className="flex items-center justify-between flex-wrap gap-3">
                     
                        <div
                          className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-amber-100"                        
                        >
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="qty-btn w-7 h-7 rounded-full flex items-center justify-center text-base font-bold bg-amber-300/60"        
                          >
                            −
                          </button>
                          <span
                            className="text-sm font-semibold w-6 text-center"
                            
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="qty-btn w-7 h-7 rounded-full flex items-center justify-center text-base font-bold bg-amber-300/50"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest transition hover:opacity-70 text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right shrink-0 sm:pl-2">
                      <p className="text-xs uppercase tracking-widest mb-1 text-gray-600" >Total</p>
                      <p className="heading-font text-2xl font-bold font-heading" >
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <button
                onClick={() => navigate("/redeem")}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest transition mt-2 text-yellow-800/70"
              >
                <ArrowRight className="w-4 h-4 text-yellow-800/70" />
                Continue Shopping
              </button>
            </div>

            {/* ── Order Summary ── */}
            <div className="lg:col-span-1">
              <div
                className="rounded-3xl p-6 shadow-md sticky top-24 bg-white"
              >
                <div className="bg-yellow-700 h-0.5 w-8 rounded-full mx-auto mb-5"/>

                <div className="flex items-center gap-2 mb-5">
                  <Package className="w-4 h-4 text-amber-500/50" />
                  <h2 className=" text-xl font-serif">
                    Order Summary
                  </h2>
                </div>

                {/* Line items */}
                <div className="space-y-3 mb-5">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center py-1 border-b border-b-amber-700/15  text-yellow-800/70"
                   
                    >
                      <span className="text-xs leading-tight flex-1 pr-2">
                        {item.name}
                        <span className="ml-1">×{item.quantity}</span>
                      </span>
                      <span className="text-xs font-medium shrink-0">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Note */}
                <p className="text-xs text-center mb-4  text-yellow-800/70">
                  Shipping & GST calculated at checkout
                </p>

                {/* Total */}
                <div
                  className="flex justify-between items-center py-3 mb-5 rounded-xl px-3 bg-amber-100"  >
                  <span className="text-xs uppercase tracking-widest font-semibold" >
                    Total ({totalItems} items)
                  </span>
                  <span className="heading-font text-xl font-bold" >
                    ₹{totalAmount}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                 onClick={()=>navigate("/checkout")}
                  className="w-full bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-shadow-red-950 py-4 rounded-xl text-sm uppercase tracking-widest font-semibold transition hover:opacity-90 inline-flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Trust note */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span>◈</span>
                  <p className="text-xs  text-yellow-800/70" >
                    Secure checkout · Insured delivery
                  </p>
                  <span >◈</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;