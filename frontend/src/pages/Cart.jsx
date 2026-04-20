import { useState, useMemo } from "react";
import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart, Trash2, ArrowRight, Package,
  Wallet, Truck, Shield, ChevronRight, Tag
} from "lucide-react";
import useCartStore from "../store/cartStore";

function Cart() {

const { cartItems, addToCart, replaceCartItem, removeFromCart, updateQuantity } = useCartStore();

  const navigate = useNavigate();

  const [deliveryMode, setDeliveryMode] = useState("wallet");

  // Smart cart type detection
  const hasDigital = cartItems.some(item => item.isDigital === true);
  const hasPhysical = cartItems.some(item => item.isDigital !== true);
  const mixedCart = hasDigital && hasPhysical;
  const allDigital = hasDigital && !hasPhysical;

  const effectiveMode = allDigital ? "wallet" : deliveryMode;
  const effectiveIsWallet = effectiveMode === "wallet";

  // Safe total calculation
  const safeTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      return sum + (Number(item.price) || 0) * (Number(item.quantity) || 1);
    }, 0);
  }, [cartItems]);

  const gst = safeTotal * 0.03;
  const delivery = 1550;
  const insurance = 500;
  const finalAmount = effectiveIsWallet
    ? safeTotal + gst
    : safeTotal + gst + delivery + insurance;

  // Empty State
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100 px-4">
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center max-w-sm w-full border border-yellow-700/20">
          <div className="w-20 h-20 rounded-full bg-amber-50 border border-yellow-700/20 flex items-center justify-center mx-auto mb-5">
            <ShoppingCart className="w-9 h-9 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-serif text-yellow-950 mb-2">Your cart is empty</h2>
          <p className="text-sm text-yellow-800/60 mb-7 font-serif">
            Add jewellery or digital gold to get started.
          </p>
          <button
            onClick={() => navigate("/redeem")}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-sm uppercase tracking-widest font-serif hover:opacity-90 transition inline-flex items-center justify-center gap-2"
          >
            Browse Jewellery <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate("/gold")}
            className="w-full mt-3 py-3 rounded-xl border border-yellow-700/30 text-sm uppercase tracking-widest font-serif text-yellow-800 hover:bg-amber-50 transition"
          >
            Buy Digital Gold
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100">

      {/* Top Header Bar */}
      <div className="bg-white border-b border-yellow-700/15 px-4 sm:px-8 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/redeem")}
            className="text-xs uppercase tracking-widest text-yellow-800/60 hover:text-yellow-700 transition font-serif flex items-center gap-1"
          >
            ← Continue Shopping
          </button>
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-yellow-700" />
            <h1 className="font-serif text-lg font-semibold text-yellow-950">
              Cart
              <span className="ml-2 text-sm font-normal text-yellow-800/60">(1 item)</span>
            </h1>
          </div>
          <div className="w-24" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* LEFT COLUMN — Items */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Fulfilment Toggle */}
            {!allDigital && (
              <div className="bg-white rounded-2xl border border-yellow-700/20 overflow-hidden">
                <div className="px-5 py-3 border-b border-yellow-700/10">
                  <p className="text-xs uppercase tracking-widest text-yellow-800/60 font-serif">
                    How would you like to receive your order?
                  </p>
                </div>
                <div className="flex">
                  <button
                    onClick={() => setDeliveryMode("wallet")}
                    className={`flex-1 flex items-center gap-3 px-5 py-4 transition border-r border-yellow-700/10 ${
                      effectiveIsWallet ? "bg-amber-50" : "bg-white hover:bg-amber-50/50"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${effectiveIsWallet ? "bg-yellow-100" : "bg-gray-100"}`}>
                      <Wallet className={`w-4 h-4 ${effectiveIsWallet ? "text-yellow-700" : "text-gray-400"}`} />
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-semibold font-serif ${effectiveIsWallet ? "text-yellow-900" : "text-gray-500"}`}>
                        Keep in Wallet
                      </p>
                      <p className="text-xs text-yellow-800/50 mt-0.5">Stored in your DigiGold account</p>
                    </div>
                    <div className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${effectiveIsWallet ? "border-yellow-600" : "border-gray-300"}`}>
                      {effectiveIsWallet && <div className="w-2 h-2 rounded-full bg-yellow-600" />}
                    </div>
                  </button>

                  <button
                    onClick={() => setDeliveryMode("delivery")}
                    className={`flex-1 flex items-center gap-3 px-5 py-4 transition ${
                      !effectiveIsWallet ? "bg-amber-50" : "bg-white hover:bg-amber-50/50"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${!effectiveIsWallet ? "bg-yellow-100" : "bg-gray-100"}`}>
                      <Truck className={`w-4 h-4 ${!effectiveIsWallet ? "text-yellow-700" : "text-gray-400"}`} />
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-semibold font-serif ${!effectiveIsWallet ? "text-yellow-900" : "text-gray-500"}`}>
                        Physical Delivery
                      </p>
                      <p className="text-xs text-yellow-800/50 mt-0.5">Shipped to your address</p>
                    </div>
                    <div className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${!effectiveIsWallet ? "border-yellow-600" : "border-gray-300"}`}>
                      {!effectiveIsWallet && <div className="w-2 h-2 rounded-full bg-yellow-600" />}
                    </div>
                  </button>
                </div>

                {!effectiveIsWallet && (
                  <div className="mx-4 mb-3 flex items-start gap-2 bg-amber-50 border border-yellow-700/15 rounded-xl px-4 py-2.5">
                    <Tag className="w-3.5 h-3.5 text-yellow-700 shrink-0 mt-0.5" />
                    <p className="text-xs text-yellow-800/70">
                      Delivery (₹1,550) + Insurance & handling (₹500) will be added.
                    </p>
                  </div>
                )}

                {mixedCart && (
                  <div className="mx-4 mb-3 flex items-start gap-2 bg-amber-50/60 border border-yellow-700/10 rounded-xl px-4 py-2.5">
                    <Shield className="w-3.5 h-3.5 text-yellow-700 shrink-0 mt-0.5" />
                    <p className="text-xs text-yellow-800/60">
                      Digital items stay in wallet • Delivery only for physical jewellery
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* All Digital Note */}
            {allDigital && (
              <div className="bg-white rounded-2xl border border-yellow-700/20 px-5 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-yellow-100 flex items-center justify-center shrink-0">
                  <Wallet className="w-4 h-4 text-yellow-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold font-serif text-yellow-900">Keep in Wallet</p>
                  <p className="text-xs text-yellow-800/60 mt-0.5">Digital items are stored directly in your DigiGold wallet.</p>
                </div>
                <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 border border-yellow-700/20 px-2 py-0.5 rounded-full">Auto Selected</span>
              </div>
            )}

            {/* Cart Items */}
            <div className="bg-white rounded-2xl border border-yellow-700/20 overflow-hidden">
              <div className="px-5 py-3 border-b border-yellow-700/10">
                <p className="text-xs uppercase tracking-widest text-yellow-800/60 font-serif">
                  1 item in your cart
                </p>
              </div>

              <div className="divide-y divide-yellow-700/10">
                {cartItems.map((item) => {
                  const isDigital = item.isDigital === true;

                  return (
                    <div key={item.id} className="flex gap-4 p-4 sm:p-5 hover:bg-amber-50/40 transition">

                      {/* Image */}
                      <div
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-amber-50 flex items-center justify-center cursor-pointer border border-yellow-700/10"
                        onClick={() => !isDigital && navigate(`/productdetails/${item.id}`)}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={e => e.target.src = "https://via.placeholder.com/96?text=◈"}
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-amber-100 to-amber-50">
                            <span className="text-2xl text-yellow-600">◈</span>
                            <span className="text-xs text-yellow-700 mt-1 font-serif">Digital</span>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2 min-w-0">
                            <h3 className="text-sm sm:text-base font-semibold font-serif text-yellow-950 truncate">
                              {item.name}
                            </h3>
                            {isDigital && (
                              <span className="shrink-0 text-xs bg-amber-100 text-yellow-800 border border-yellow-700/20 px-1.5 py-0.5 rounded-full font-serif">
                                Digital
                              </span>
                            )}
                          </div>
                          <p className="text-base sm:text-lg font-bold font-serif text-yellow-900 shrink-0">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </p>
                        </div>

                        <p className="text-xs text-yellow-800/60 mb-4">
                          {item.purity && `${item.purity} · `}{item.weight}g
                          <span className="ml-2 text-yellow-800/40">
                            ₹{item.price.toLocaleString("en-IN")} each
                          </span>
                        </p>

                        {/* Quantity Controls - ONLY for Physical Items */}
                        {!isDigital && (
                          <div className="flex items-center gap-4">
                            <div className="flex items-center bg-amber-50 border border-yellow-700/20 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-lg font-bold text-yellow-800 hover:bg-amber-100 transition"
                              >
                                −
                              </button>
                              <span className="w-8 text-center text-sm font-semibold text-yellow-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-lg font-bold text-yellow-800 hover:bg-amber-100 transition"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center gap-1 text-xs text-red-400 hover:text-red-500 transition uppercase tracking-widest"
                            >
                              <Trash2 className="w-3 h-3" />
                              Remove
                            </button>
                          </div>
                        )}

                        {/* Digital Items - Only Remove Button */}
                        {isDigital && (
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-500 transition uppercase tracking-widest"
                          >
                            <Trash2 className="w-3 h-3" />
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Order Summary */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-yellow-700/20 overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-yellow-700/10 flex items-center gap-2">
                <Package className="w-4 h-4 text-yellow-700/60" />
                <h2 className="font-serif font-semibold text-yellow-950">Order Summary</h2>
              </div>

              <div className="px-5 py-4 space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-2">
                    <span className="text-xs text-yellow-800/70 flex-1 leading-relaxed">
                      {item.name}
                      <span className="text-yellow-800/40 ml-1">×{item.quantity}</span>
                    </span>
                    <span className="text-xs font-medium text-yellow-900 shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mx-5 border-t border-yellow-700/10" />

              <div className="px-5 py-4 space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-xs text-yellow-800/60">Subtotal</span>
                  <span className="text-xs font-medium text-yellow-900">₹{safeTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-yellow-800/60">GST (3%)</span>
                  <span className="text-xs font-medium text-yellow-900">₹{gst.toFixed(2)}</span>
                </div>
                {!effectiveIsWallet && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-xs text-yellow-800/60">Delivery Charge</span>
                      <span className="text-xs font-medium text-yellow-900">₹{delivery.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-yellow-800/60">Insurance / Handling</span>
                      <span className="text-xs font-medium text-yellow-900">₹{insurance}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="mx-5 mb-4 bg-amber-50 border border-yellow-700/15 rounded-xl px-4 py-3 flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest font-semibold text-yellow-900 font-serif">
                  Total
                </span>
                <span className="text-xl font-bold font-serif text-yellow-900">
                  ₹{finalAmount.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="px-5 pb-5 space-y-3">
                <button
                  onClick={() => navigate("/checkout", { state: { deliveryMode: effectiveMode } })}
                  className="w-full bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition inline-flex items-center justify-center gap-2 text-yellow-950"
                >
                  {effectiveIsWallet ? (
                    <><Wallet className="w-4 h-4" /> Proceed to Checkout</>
                  ) : (
                    <><Truck className="w-4 h-4" /> Proceed to Checkout</>
                  )}
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-4 pt-1">
                  {[
                    { icon: Shield, text: "Secure" },
                    { icon: Package, text: "Insured" },
                    { icon: effectiveIsWallet ? Wallet : Truck, text: effectiveIsWallet ? "Vault stored" : "Fast delivery" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1">
                      <Icon className="w-3 h-3 text-yellow-700/50" />
                      <span className="text-xs text-yellow-800/50 font-serif">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;