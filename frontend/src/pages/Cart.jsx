import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  Package,
  Wallet,
  Truck,
  ChevronRight,
  Clock,
  LoaderCircle,
} from 'lucide-react';

import { toast } from 'react-toastify';
import useCartStore from '../store/cartStore';
import api from '../api/axiosInstance';
import PageLoader from '../components/ProfileLoading';
import useKycStore from '../store/useKYCStore';

function Cart() {
  const { cartItems, fetchCart, removeFromCart, updateQuantity } = useCartStore();
  const { kycStatus, loadKycProgress } = useKycStore();

  const navigate = useNavigate();

  const [showStaleModal, setShowStaleModal] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [kycPopup, setKycPopup] = useState(false);
  // Detect cart type
  const hasMetalItems = cartItems.some((item) => item.type === 'METAL');
  const hasGold = cartItems.some((item) => item.type === 'METAL' && item.metalType === 'GOLD');
  const hasSilver = cartItems.some((item) => item.type === 'METAL' && item.metalType === 'SILVER');

  const hasProductItems = cartItems.some((item) => item.type === 'PRODUCT');

  useEffect(() => {
    const loadCart = async () => {
      try {
        setPageLoading(true);
        await fetchCart();
      } finally {
        setPageLoading(false);
      }
    };

    loadCart();
    loadKycProgress();
  }, []);

  const handleProceedToCheckout = async () => {
    if (kycStatus !== 'approved') {
      setKycPopup(true);
      return;
    }
    setButtonLoading(true);
    try {
      setCheckoutLoading(true);

      const mode = hasMetalItems ? 'WALLET' : 'DELIVERY';

      console.log(' CHECKOUT DEBUG ');
      console.log('Cart Items:', cartItems);
      console.log('Has Metal Items:', hasMetalItems);
      console.log('Has Product Items:', hasProductItems);
      console.log('Selected Checkout Mode:', mode);

      const prepareRes = await api.post('/cart/checkout/prepare', { mode });

      console.log('API SUCCESS');
      console.log('Full Response  for checkout:', prepareRes.data);

      if (!prepareRes.data?.success) {
        toast.error('Checkout preparation failed');
        return;
      }

      navigate('/checkout', {
        state: {
          deliveryMode: mode.toLowerCase(),
          checkoutData: prepareRes.data?.data,
        },
      });
    } catch (error) {
      console.log(' CHECKOUT ERROR ');
      console.log(error);

      const errors = error.response?.data?.data?.errors;

      if (errors && errors.length > 0) {
        errors.forEach((err) => {
          toast.error(err.reason || err.message);
        });
      } else {
        toast.error(error.response?.data?.message || 'Checkout failed');
      }
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="animate-pulse flex flex-col gap-3 mt-10 md:m-20 p-4">
        <div className="h-20 bg-secondary/8 rounded-lg w-full"></div>
        <div className="h-50 bg-secondary/7 rounded-lg w-full"></div>
        <div className="h-50 bg-secondary/7 rounded-lg w-full"></div>
      </div>
    );
  }
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 rounded-3xl shadow-lg p-10 text-center max-w-sm w-full ">
          <div className="w-20 h-20 rounded-full bg-amber-50 border border-yellow-700/20 flex items-center justify-center mx-auto mb-5">
            <ShoppingCart className="w-9 h-9 text-yellow-600" />
          </div>

          <h2 className="text-2xl font-serif text-primary mb-2">Your cart is empty</h2>

          <p className="text-sm text-primary/50 mb-7 font-serif ">
            Add jewellery or digital metals to get started.
          </p>

          <button
            onClick={() => navigate('/redeem')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-background text-sm uppercase tracking-widest font-serif hover:opacity-90 transition inline-flex items-center justify-center gap-2"
          >
            Browse Jewellery
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('/gold')}
            className="w-full mt-3 py-3 rounded-xl border border-white/30 text-sm uppercase tracking-widest font-serif text-primary hover:bg-amber-50 transition"
          >
            Buy Digital Gold
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" 2xl:min-h-screen  max-w-[1440px] m-auto bg-background ">
      {/* Header */}
      <div className="w-full  bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22]  sm:px-6 lg:px-8 py-3 sm:py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto  flex items-center justify-between gap-2">
          <button
            onClick={() => navigate('/redeem')}
            className=" p-2 text-[10px] 2xl:text-lg sm:text-xs uppercase tracking-widest text-primary/70 hover:text-yellow-700 transition font-serif flex items-center gap-1 whitespace-nowrap"
          >
            ← Continue Shopping
          </button>

          <div className=" p-2 flex items-center gap-2 min-w-0">
            <ShoppingCart className="w-4 h-4 text-primary shrink-0" />

            <h1 className="font-serif text-sm sm:text-base md:text-lg 2xl:text-2xl font-semibold text-primary truncate">
              Car
              <span className="ml-1 sm:ml-2 text-[11px] sm:text-sm 2xl:text-lg font-normal text-primary/70">
                ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              </span>
            </h1>
          </div>

          <div className="hidden sm:block w-24" />
        </div>
      </div>

      <div className="w-full max-w-[1800px] 2xl:max-w-[2200px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-16 py-8">
        <div className="flex flex-col lg:flex-row gap-6 2xl:gap-10 items-start">
          {/* LEFT SIDE */}
          <div className="flex-1 min-w-0 w-full space-y-4 2xl:space-y-6">
            {/* Cart Type Card */}
            <div className=" rounded-2xl bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#111112] border border-white/70 flex items-center justify-center shrink-0">
                {hasMetalItems ? (
                  <Wallet className="w-4 h-4 text-primary" />
                ) : (
                  <Truck className="w-4 h-4 text-primary" />
                )}
              </div>

              <div>
                <p className="text-sm 2xl:text-2xl font-semibold font-serif text-primary">
                  {hasMetalItems ? 'Digital Metal Wallet' : ' Delivery'}
                </p>

                <p className="text-xs 2xl:text-lg text-white/70 mt-0.5">
                  {hasMetalItems
                    ? 'Digital metals will be stored in your DigiGold wallet.'
                    : 'Jewellery products will be delivered to your address.'}
                </p>
              </div>
            </div>

            {/* Cart Items */}
            <div className="bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 rounded-2xl  overflow-hidden">
              <div className="px-5 py-3 border-b border-yellow-700/10">
                <p className="text-xs 2xl:text-lg uppercase tracking-widest text-primary/70 font-serif">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>

              <div className="divide-y divide-yellow-700/10">
                {cartItems.map((item) => {
                  const isDigital = item.type === 'METAL';

                  return (
                    <div key={item.id} className="flex gap-4 p-4 sm:p-5  transition">
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
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-amber-100 to-amber-50">
                            <span className="text-2xl 2xl:text-4xl text-yellow-600">◈</span>

                            <span className="text-xs 2xl:text-2xl text-yellow-700 mt-1 font-serif">
                              {item.type}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2 min-w-0">
                            <h3 className="text-sm sm:text-base font-sans 2xl:text-2xl font-bold text-primary truncate whitespace-nowrap">
                              {item.name}
                            </h3>

                            {isDigital ? (
                              <span className="shrink-0 text-xs 2xl:text-lg text-secondary  bg-baground text-primary border border-yellow-700/20 px-1.5 py-0.5 rounded-full font-serif">
                                Digital
                              </span>
                            ) : (
                              <span className="shrink-0 text-xs 2xl:text-lg text-secondary bg-[#111112] bg-baground text-primary border border-yellow-700/20 px-1.5 py-0.5 rounded-full font-serif">
                                Delivery
                              </span>
                            )}
                          </div>

                          <p className="text-base sm:text-lg 2xl:text-2xl font-bold  text-primary shrink-0">
                            ₹{item.totalPrice?.toLocaleString('en-IN')}
                          </p>
                        </div>

                        <p className="text-xs 2xl:text-lg text-primary/60 mb-4">
                          {item.purity && `${item.purity} · `}
                          {item.weight}g
                        </p>

                        {/* PRODUCT */}
                        {!isDigital && (
                          <div className="flex items-center gap-4">
                            <div className="flex items-center bg-[#111112] border border-white/20 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-lg 2xl:text-xl font-bold text-white/70 hover:bg-amber-100 transition"
                              >
                                −
                              </button>

                              <span className="w-8 text-center text-sm 2xl:text-xl font-semibold text-white/70">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-lg  2xl:text-xl font-bold text-white/70 hover:bg-amber-100 transition"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={async () => {
                                try {
                                  await removeFromCart(item.id);

                                  toast.success('Item removed');
                                } catch {
                                  toast.error('Failed to remove item');
                                }
                              }}
                              className="flex items-center gap-1 text-xs 2xl:text-xl text-red-400 hover:text-red-500 transition uppercase tracking-widest"
                            >
                              <Trash2 className="w-3 h-3" />
                              Remove
                            </button>
                          </div>
                        )}

                        {/* METAL */}
                        {isDigital && (
                          <button
                            onClick={async () => {
                              try {
                                await removeFromCart(item.id);

                                toast.success('Item removed');
                              } catch {
                                toast.error('Failed to remove item');
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

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-[380px] xl:w-[420px] 2xl:w-[480px] shrink-0 lg:sticky lg:top-24">
            <div className="bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 rounded-2xl  overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-primary/10 flex items-center gap-2">
                <Package className="w-4 h-4 text-primary" />

                <h2 className="font-serif font-semibold text-primary 2xl:text-2xl">
                  Order Summary
                </h2>
              </div>

              <div className="px-5 py-4 space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-2">
                    <span className="text-xs 2xl:text-xl text-primary/70 flex-1 leading-relaxed">
                      {item.name}

                      <span className="text-primary/50 ml-1 2xl:text-xl">×{item.quantity}</span>
                    </span>

                    <span className="text-xs font-medium text-primary 2xl:text-2xl shrink-0">
                      ₹{item.totalPrice?.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mx-5 border-t border-yellow-700/10" />

              <div className="px-5 pb-5 space-y-3 pt-5">
                <button
                  onClick={handleProceedToCheckout}
                  className="text-background 2xl:text-xl w-full bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800  hover:opacity-55 py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold  transition inline-flex items-center justify-center gap-2"
                >
                  {buttonLoading ? (
                    <>
                      <LoaderCircle className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {hasMetalItems ? (
                        <>
                          <Wallet className="w-4 h-4" />
                          Proceed to Checkout
                        </>
                      ) : (
                        <>
                          <Truck className="w-4 h-4" />
                          Proceed to Checkout
                        </>
                      )}
                    </>
                  )}

                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-4 pt-1">
                  {[
                    {
                      icon: Package,
                      text: 'Insured',
                    },
                    {
                      icon: hasMetalItems ? Wallet : Truck,
                      text: hasMetalItems ? 'Vault stored' : 'Fast delivery',
                    },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1">
                      <Icon className="w-3 h-3 text-primary/70" />

                      <span className="text-xs text-primary/70 font-serif">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {kycPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#111117] border border-white/20 rounded-2xl p-6 w-[90%] max-w-sm">
            <h2 className="text-xl text-white mb-3">KYC Verification Required</h2>

            <p className="text-white/70 mb-6">Please verify your KYC to continue buying .</p>

            <div className="flex gap-3">
              <button
                onClick={() => setKycPopup(false)}
                className="flex-1 py-3 border border-white/20 rounded-xl text-white"
              >
                Cancel
              </button>

              <button
                onClick={() => navigate('/kycpage')}
                className="flex-1 py-3 rounded-xl bg-gray-500 text-background font-semibold"
              >
                Verify KYC
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
