import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart, Trash2, ArrowRight, Package,
  Wallet, Truck, Shield, ChevronRight, Tag, Clock
} from "lucide-react";
import useCartStore from "../store/cartStore";
import { toast } from "react-toastify";
import { useEffect } from "react";

import useAuthStore from "../store/authStore";
import api from "../api/axiosInstance";



function Cart() {

  const { cartItems, fetchCart, removeFromCart, updateQuantity } = useCartStore();
  const navigate = useNavigate();
  const [deliveryMode, setDeliveryMode] = useState("wallet");
  const [showStaleModal, setShowStaleModal] = useState(false);

  const hasDigital = cartItems.some(item => item.isDigital === true);
  const hasPhysical = cartItems.some(item => item.isDigital !== true);
  const mixedCart = hasDigital && hasPhysical;
  const allDigital = hasDigital && !hasPhysical;

  const effectiveMode = allDigital ? "wallet" : deliveryMode;
  const effectiveIsWallet = effectiveMode === "wallet";

  useEffect(() => {
    fetchCart();
  }, []);



 const handleProceedToCheckout = async () => {
  try {


    const mode = hasPhysical ? "DELIVERY" : "WALLET";

    console.log("========== CHECKOUT DEBUG ==========");
    console.log("Cart Items:", cartItems);
    console.log("Has Digital:", hasDigital);
    console.log("Has Physical:", hasPhysical);
    console.log("Mixed Cart:", mixedCart);
    console.log("Selected Checkout Mode:", mode);
    console.log("Calling API: /cart/checkout/prepare");
    console.log("Payload:", { mode });

    // STEP 1 → Prepare checkout session
    const prepareRes = await api.post(
      "/cart/checkout/prepare",
      { mode }
    );

    console.log("========== API SUCCESS ==========");
    console.log("Status Code:", prepareRes.status);
    console.log("Full Response:", prepareRes.data);
    console.log("Checkout Data:", prepareRes.data?.data);

    // Optional success validation
    if (!prepareRes.data?.success) {
      toast.error("Checkout preparation failed");
      return;
    }

    // STEP 2 → Navigate to Checkout page
    navigate("/checkout", {
      state: {
        deliveryMode: mode.toLowerCase(), // delivery / wallet
        checkoutData: prepareRes.data?.data,
      },
    });

  } catch (error) {
    console.log("========== CHECKOUT ERROR ==========");
    console.log("FULL ERROR:", error);
    console.log("RESPONSE:", error.response);
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    console.log("MESSAGE:", error.response?.data?.message);
    console.log("VALIDATION ERRORS:", error.response?.data?.data?.errors);

    // Show backend validation errors if available
    const errors = error.response?.data?.data?.errors;

    if (errors && errors.length > 0) {
      errors.forEach((err) => {
        toast.error(err.reason || err.message);
      });
    } else {
      toast.error(
        error.response?.data?.message ||
        "Checkout failed"
      );
    }
  }
};


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
<div className="2xl:h-full max-w-[1440px] m-auto bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100 pb-12">

      {/* Stale Cart Modal */}
      {showStaleModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-yellow-700" />
            </div>
            <h2 className="text-lg font-semibold text-center text-yellow-950 mb-2 font-serif">
              Price Has Been Updated
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Your cart was added over 60 minutes ago. Gold prices change frequently —
              please update your cart with the latest prices before proceeding.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowStaleModal(false)}
                className="flex-1 py-3 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCart}
                className="flex-1 py-3 bg-gradient-to-r from-yellow-800 via-yellow-500 to-yellow-800 text-black rounded-xl text-sm font-semibold hover:scale-[1.02] transition"
              >
                Update Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header Bar */}
     {/* Top Header Bar */}
<div className="w-full bg-white border-b border-yellow-700/15 px-3 sm:px-6 lg:px-8 py-3 sm:py-4 sticky top-0 z-10">
  <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
    
    <button
      onClick={() => navigate("/redeem")}
      className="text-[10px] sm:text-xs uppercase tracking-widest text-yellow-800/60 hover:text-yellow-700 transition font-serif flex items-center gap-1 whitespace-nowrap"
    >
      ← Continue Shopping
    </button>

    <div className="flex items-center gap-2 min-w-0">
      <ShoppingCart className="w-4 h-4 text-yellow-700 shrink-0" />
      <h1 className="font-serif text-sm sm:text-base md:text-lg font-semibold text-yellow-950 truncate">
        Cart
        <span className="ml-1 sm:ml-2 text-[11px] sm:text-sm font-normal text-yellow-800/60">
          ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
        </span>
      </h1>
    </div>

    <div className="hidden sm:block w-24" />
  </div>
</div>

  <div className="w-full max-w-[1800px] 2xl:max-w-[2200px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-16 py-8">
       <div className="flex flex-col lg:flex-row gap-6 2xl:gap-10 items-start">

       {/* LEFT COLUMN — Items */}
<div className="flex-1 min-w-0 w-full space-y-4 2xl:space-y-6">

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
                  <p className="text-xs text-yellow-800/60 mt-0.5">Digital items are stored directly in your DgiGold wallet.</p>
                </div>
                
              </div>
            )}

            {/* Cart Items */}
            <div className="bg-white rounded-2xl border border-yellow-700/20 overflow-hidden">
              <div className="px-5 py-3 border-b border-yellow-700/10">
                <p className="text-xs uppercase tracking-widest text-yellow-800/60 font-serif">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
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
                            <h3 className="text-sm sm:text-base 2xl:text-lg font-semibold font-serif text-yellow-950 truncate">
                              {item.name}
                            </h3>
                            {isDigital && (
                              <span className="shrink-0 text-xs bg-amber-100 text-yellow-800 border border-yellow-700/20 px-1.5 py-0.5 rounded-full font-serif">
                                Digital
                              </span>
                            )}
                          </div>
                          <p className="text-base sm:text-lg font-bold font-serif text-yellow-900 shrink-0">
                            ₹{item.totalPrice?.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <p className="text-xs text-yellow-800/60 mb-4">
                          {item.purity && `${item.purity} · `}{item.weight}g
                          <span className="ml-2 text-yellow-800/40">
                            ₹{item.totalPrice?.toLocaleString("en-IN")} each
                          </span>
                        </p>

                        {/* Physical Items - Quantity + Remove */}
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
                              onClick={async () => {
                                try {
                                  await removeFromCart(item.id);
                                  toast.success("Item removed");
                                } catch {
                                  toast.error("Failed to remove item");
                                }
                              }}
                              className="flex items-center gap-1 text-xs text-red-400 hover:text-red-500 transition uppercase tracking-widest"
                            >
                              <Trash2 className="w-3 h-3" />
                              Remove
                            </button>
                          </div>
                        )}

                        {/* Digital Items - Remove Only */}
                        {isDigital && (
                          <button
                            onClick={async () => {
                              try {
                                await removeFromCart(item.id);
                                toast.success("Item removed");
                              } catch {
                                toast.error("Failed to remove item");
                              }
                            }}
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
      <div className="w-full lg:w-[380px] xl:w-[420px] 2xl:w-[480px] shrink-0 lg:sticky lg:top-24">
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
                      ₹{item.totalPrice?.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mx-5 border-t border-yellow-700/10" />

              {/* <div className="px-5 py-4 space-y-2.5">
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
              </div> */}

              {/* <div className="mx-5 mb-4 bg-amber-50 border border-yellow-700/15 rounded-xl px-4 py-3 flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest font-semibold text-yellow-900 font-serif">
                  Total
                </span>
                <span className="text-xl font-bold font-serif text-yellow-900">
                  ₹{finalAmount.toLocaleString("en-IN")}
                </span>
              </div> */}

              <div className="px-5 pb-5 space-y-3">
                <button
                  onClick={handleProceedToCheckout}
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