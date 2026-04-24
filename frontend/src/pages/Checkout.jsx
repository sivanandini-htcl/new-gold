import { useCart } from '../components/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  CheckCircle,
  ChevronRight,
  Truck,
  Shield,
  Package,
  Edit3,
  Plus,
  Wallet,
  Landmark,
  Smartphone,
  ShoppingCart,
  ArrowRight,
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';
import { generateHexId } from '../utils/orderId';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';

const SAVED_ADDRESSES = [
  {
    id: 1,
    name: 'Home',
    address: '12, MG Road',
    city: 'Bangalore',
    pincode: '560001',
    phone: '9876543210',
  },
  {
    id: 2,
    name: 'Office',
    address: '13, Whitefield',
    city: 'Bangalore',
    pincode: '560002',
    phone: '9123456780',
  },
];

const details = [
  { name: 'name', placeholder: 'Full Name', type: 'text' },
  { name: 'phone', placeholder: 'Phone Number', type: 'tel' },
  { name: 'address', placeholder: 'Full Address', type: 'text' },
];

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    cartItems,
    addToCart,
    replaceCartItem,
    removeFromCart,
    updateQuantity,
    totalAmount,
    totalItems,
  } = useCartStore();

  // ── Read deliveryMode passed from Cart ──
  const deliveryMode = location.state?.deliveryMode || 'wallet';
  const isWallet = deliveryMode === 'wallet';
  const userEmail = useAuthStore((s) => s.user?.email);
  const [activeStep, setActiveStep] = useState(isWallet ? 2 : 1);
  const [selectedAddress, setSelectedAddress] = useState(SAVED_ADDRESSES[0].id);
  const [addingNew, setAddingNew] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  // ── NaN fix: safely compute total from cart items if totalAmount is bad ──
  // Add at the top with other location.state reads
  const checkoutData = location.state?.checkoutData;
  const pricing = checkoutData?.pricing;
  const cartId = checkoutData?.cartId;
  const sessionId = checkoutData?.checkoutSessionId;

  //  Replace the
  const subtotal = pricing?.subtotal || cartItems.reduce((sum, i) => sum + Number(i.totalPrice), 0);

  const gstPercent = pricing?.gstPercent;
  const handlingFee = pricing?.handlingFee;
  const shippingBase = pricing?.shippingBase;
  const shippingGST = shippingBase?.shippingGST;

  const gst = pricing?.gstAmount;
  const delivery = pricing?.shippingBase || 1550;
  const insurance = pricing?.handlingFee || 500;
  const finalAmount = pricing?.totalAmount;

  const placeOrder = () => {
    const order = {
      id: Date.now(),
      items: cartItems,
      totalAmount: finalAmount,
      totalItems,
      deliveryMode,
      address: isWallet ? null : SAVED_ADDRESSES.find((a) => a.id === selectedAddress),
      paymentMethod: selectedPayment,
      date: new Date(),
    };
    const existing = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([order, ...existing]));
    setOrdered(true);
  };

  // ── Step 1: Create Order → Step 2: Open Razorpay Popup ──
  const handleContinueToPayment = async () => {
    try {
      const idempotencyKey = generateHexId();
      const payload = {
        cartId,
        mode: isWallet ? 'WALLET' : 'DELIVERY',
        paymentProvider: 'RAZORPAY',
        checkoutSessionId: sessionId,
      };

      const { data } = await api.post('/orders/checkout', payload, {
        headers: { 'idempotency-key': idempotencyKey },
      });
      console.log('print data .......', data);

      if (data.success) {
        const {
          razorpayOrderId, // ✅ MUST come from backend
          pricing, // ✅ in paise
          orderNumber,
          id, //id
        } = data.data;
        console.log(data.data.id); 
        if (!razorpayOrderId) {
          toast.error('Razorpay order id missing from backend');
          return;
        }
        openRazorpayPopup({
          order_id: razorpayOrderId,
          currency: 'INR',
          orderNumber,
          backendOrderId: id, //id
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Checkout failed');
    }
  };

  const openRazorpayPopup = ({ order_id, currency, orderNumber, backendOrderId }) => {
    //id
    if (!window.Razorpay) {
      toast.error('Razorpay SDK not loaded');
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      currency: currency || 'INR',
      name: 'DigiGold',
      description: 'Order Payment',

      order_id: order_id, // ✅ Razorpay order id

      handler: function (response) {
        console.log(' FULL RAZORPAY RESPONSE:', response);
        handleVerifyPayment({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          // orderId: orderNumber,
          orderId: backendOrderId, //id
        });
      },

      prefill: {
        email: userEmail || '',
      },

      theme: {
        color: '#b45309',
      },

      modal: {
        ondismiss: () => {
          toast.warn('Payment cancelled');
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on('payment.failed', function (response) {
      console.error(response.error);
      toast.error(response.error.description);
    });
  };

  //  Verify Payment with Backend
  const handleVerifyPayment = async (response) => {
    try {
      const res = {
        // orderId: response.id,
        orderId: response.orderId, //id
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,
      };

      const { data } = await api.post('/orders/buy/verify-payment', res);

      if (data.success) {
        setOrdered(true);
      } else {
        toast.error('Verification failed');
      }
    } catch (err) {
      console.error(err);
      console.log('FULL ERROR:', err);
      console.log('RESPONSE:', err.response);
      console.log('DATA:', err.response?.data);
      console.log('MESSAGE:', err.response?.data?.message);
      toast.error('Verification error');
    }
  };

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="h-auto flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-50">
        <div className="rounded-3xl p-12 shadow-lg text-center max-w-sm w-full bg-white">
          <div className="h-0.5 w-12 rounded-full mx-auto mb-6" />
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingCart size={80} className="p-2 rounded-4xl text-yellow-700 animate-bounce" />
          </div>
          <h1 className="text-4xl font-serif mb-2">Your Cart</h1>
          <p className="text-xs uppercase tracking-widest mb-6 font-serif">No items yet</p>
          <p className="text-sm mb-8 font-serif">Your cart is empty.</p>
          <button
            onClick={() => navigate('/redeem')}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-sm uppercase tracking-widest font-serif transition hover:opacity-90 inline-flex items-center justify-center gap-2"
          >
            Browse Jewellery <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Order Confirmed screen
  if (ordered) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100">
        <div className="rounded-3xl p-12 text-center shadow-lg max-w-sm w-full bg-white border border-yellow-700/30">
          <div className="bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 h-0.5 w-12 rounded-full mx-auto mb-6" />
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 bg-green-100">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-4xl font-serif font-bold mb-2 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
            {isWallet ? 'Added to Wallet!' : 'Order Confirmed!'}
          </h2>
          <p className="text-xs uppercase tracking-widest mb-3 text-green-700">
            {isWallet ? 'Success' : 'Thank you for your purchase'}
          </p>
          <p className="text-sm leading-relaxed mb-8 text-yellow-800/70">
            {isWallet
              ? 'Your Gold/Silver has been successfully added to your DigiGold wallet. You can view your holdings in your portfolio.'
              : "Your jewellery will be delivered within 3–5 business days. You'll receive a tracking update on your registered number."}
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-yellow-950"
          >
            {isWallet ? 'Go to Portfolio' : 'Back to Home'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest transition text-yellow-900 hover:text-yellow-600 mb-3"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </button>
          <div className="text-center">
            <h1 className="font-serif text-xl md:text-3xl font-bold text-center">
              Secure Checkout
            </h1>
            <div className="inline-flex items-center gap-2 mt-2 px-4 py-1.5 rounded-full bg-amber-100 border border-yellow-700/20">
              {isWallet ? (
                <Wallet className="w-3.5 h-3.5 text-yellow-700" />
              ) : (
                <Truck className="w-3.5 h-3.5 text-yellow-700" />
              )}
              <span className="text-xs uppercase tracking-widest text-yellow-800/70 font-serif">
                {isWallet ? 'Keep in Wallet' : 'Delivery to Address'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT: Stepper */}
          <div className="lg:col-span-2 space-y-3">
            {/* STEP 0: Login — always done */}
            <div className="bg-white rounded-xl p-4 border border-yellow-700/20 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center bg-green-100">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-yellow-800/60">Step 1</p>
                  <p className="text-sm font-semibold font-serif">Login / Account</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-green-600">Verified ✓</p>
                <p className="text-xs text-yellow-800/60">userEmail</p>
              </div>
            </div>

            {/* STEP 1: Delivery Address — only in delivery mode */}
            {!isWallet && (
              <>
                {activeStep === 1 ? (
                  <div className="rounded-3xl p-6 shadow-md bg-white border border-yellow-900/40">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-amber-950">2</span>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-yellow-800/60">
                          Step 2
                        </p>
                        <p className="text-base font-semibold flex items-center gap-2 font-serif">
                          <MapPin className="w-4 h-4 text-yellow-700" /> Delivery Address
                        </p>
                      </div>
                    </div>

                    {!addingNew && (
                      <div className="space-y-3 mb-4">
                        {SAVED_ADDRESSES.map((addr) => (
                          <div
                            key={addr.id}
                            className={`rounded-xl p-4 cursor-pointer border-2 transition ${
                              selectedAddress === addr.id
                                ? 'border-yellow-600 bg-amber-50'
                                : 'border-yellow-700/20 hover:border-yellow-400'
                            }`}
                            onClick={() => setSelectedAddress(addr.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedAddress === addr.id ? 'border-yellow-600' : 'border-gray-400'}`}
                              >
                                {selectedAddress === addr.id && (
                                  <div className="w-2 h-2 rounded-full bg-yellow-600" />
                                )}
                              </div>
                              <div className="flex-1">
                                <span className="text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-yellow-800">
                                  {addr.name}
                                </span>
                                <p className="text-sm font-medium mt-1">{addr.address}</p>
                                <p className="text-xs text-yellow-800/60">
                                  {addr.city} – {addr.pincode}
                                </p>
                                <p className="text-xs text-yellow-800/60 mt-0.5">{addr.phone}</p>
                              </div>
                              <button
                                onClick={(e) => e.stopPropagation()}
                                className="shrink-0 p-1.5 rounded-lg hover:opacity-70"
                              >
                                <Edit3 className="w-3 h-3 text-yellow-700" />
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={() => setAddingNew(true)}
                          className="w-full py-3 rounded-2xl text-sm inline-flex items-center justify-center gap-2 border border-yellow-900/40 text-yellow-900 hover:opacity-80 transition"
                        >
                          <Plus className="w-4 h-4" /> Add New Address
                        </button>
                      </div>
                    )}

                    {addingNew && (
                      <div className="space-y-3 mb-4 p-4 rounded-2xl bg-amber-50 border border-yellow-700/20">
                        <p className="text-xs uppercase tracking-widest font-semibold mb-2 text-yellow-800/70">
                          New Address
                        </p>
                        {details.map((f) => (
                          <input
                            key={f.name}
                            type={f.type}
                            placeholder={f.placeholder}
                            value={newAddr[f.name]}
                            onChange={(e) => setNewAddr({ ...newAddr, [f.name]: e.target.value })}
                            className="border border-yellow-700/40 p-2 rounded-md flex w-full bg-white focus:border-yellow-600 outline-none"
                          />
                        ))}
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="City"
                            value={newAddr.city}
                            onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                            className="border border-yellow-700/40 p-2 rounded-md bg-white focus:border-yellow-600 outline-none"
                          />
                          <input
                            type="text"
                            placeholder="Pincode"
                            value={newAddr.pincode}
                            onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                            className="border border-yellow-700/40 p-2 rounded-md w-full bg-white focus:border-yellow-600 outline-none"
                          />
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => setAddingNew(false)}
                            className="flex-1 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold border border-yellow-900/40"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => setAddingNew(false)}
                            className="flex-1 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-yellow-950"
                          >
                            Save Address
                          </button>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setActiveStep(2)}
                      className="w-full bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition inline-flex items-center justify-center gap-2"
                    >
                      Deliver Here <ChevronRight className="w-4 h-4 text-black" />
                    </button>
                  </div>
                ) : (
                  activeStep > 1 && (
                    <div
                      className="bg-white rounded-xl p-4 border border-yellow-700/20 flex justify-between items-center cursor-pointer"
                      onClick={() => setActiveStep(1)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-green-100">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-yellow-800/60">
                            Step 2 · Delivery Address
                          </p>
                          <p className="text-sm font-medium font-serif">
                            {SAVED_ADDRESSES.find((a) => a.id === selectedAddress)?.address},{' '}
                            {SAVED_ADDRESSES.find((a) => a.id === selectedAddress)?.city}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs uppercase tracking-widest text-yellow-700 cursor-pointer">
                        Change
                      </span>
                    </div>
                  )
                )}
              </>
            )}

            {/* STEP 2: Order Summary */}
            {activeStep === 2 ? (
              <div className="rounded-3xl p-6 shadow-md bg-white border border-yellow-900/40">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-amber-950">{isWallet ? '2' : '3'}</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-yellow-800/60">
                      {isWallet ? 'Step 2' : 'Step 3'}
                    </p>
                    <p className="text-base font-semibold flex items-center gap-2 font-serif">
                      <Package className="w-4 h-4 text-yellow-700" /> Order Summary
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 items-center py-2 border border-yellow-900/20 p-3 rounded-lg"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-amber-50 flex items-center justify-center">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) =>
                              (e.target.src = 'https://via.placeholder.com/56?text=◈')
                            }
                          />
                        ) : (
                          <span className="text-xl text-yellow-600">◈</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate font-serif">{item.name}</p>
                        <p className="text-xs text-yellow-800/60">
                          {item.weight}g · Qty {item.quantity}
                        </p>
                        {item.isDigital && (
                          <span className="text-xs bg-amber-100 text-yellow-800 border border-yellow-700/20 px-1.5 py-0.5 rounded-full">
                            Digital
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold shrink-0 font-serif">₹{subtotal}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleContinueToPayment}
                  className="w-full py-3.5 bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 rounded-xl text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition inline-flex items-center justify-center gap-2"
                >
                  Continue to Payment <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              activeStep > 2 && (
                <div
                  className="bg-white rounded-xl p-4 border border-yellow-700/20 flex justify-between items-center cursor-pointer"
                  onClick={() => setActiveStep(2)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center bg-green-100">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-yellow-800/60">
                        {isWallet ? 'Step 2' : 'Step 3'} · Order Summary
                      </p>
                      <p className="text-sm font-medium font-serif">
                        {totalItems} {totalItems === 1 ? 'item' : 'items'} · ₹{subtotal}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-yellow-700">Change</span>
                </div>
              )
            )}

            {/* STEP 3: Payment */}
            {activeStep === 3 && (
              <div className="rounded-3xl p-6 shadow-md bg-white border border-yellow-900/40">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-amber-950">{isWallet ? '3' : '4'}</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-yellow-800/60">
                      {isWallet ? 'Step 3' : 'Step 4'}
                    </p>
                    <p className="text-base font-semibold flex items-center gap-2 font-serif">
                      <CreditCard className="w-4 h-4 text-yellow-700" /> Payment
                    </p>
                  </div>
                </div>

                {/* Razorpay Info Banner */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-yellow-700/20 mb-5">
                  <img src="https://razorpay.com/favicon.ico" alt="Razorpay" className="w-6 h-6" />
                  <div>
                    <p className="text-sm font-semibold font-serif text-yellow-900">
                      Pay via Razorpay
                    </p>
                    <p className="text-xs text-yellow-800/60">
                      UPI · Cards · Net Banking · Wallets
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleContinueToPayment}
                  className="w-full bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 py-4 rounded-xl text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition inline-flex items-center justify-center gap-2"
                >
                  {isWallet ? (
                    <>
                      <Wallet className="w-4 h-4" /> Pay & Add to Wallet · ₹{finalAmount}
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" /> Pay & Place Order · ₹{finalAmount}
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 mt-3">
                  <Shield className="w-3 h-3 text-yellow-700/50" />
                  <p className="text-xs text-yellow-800/60">
                    256-bit SSL encrypted · Safe & secure
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Price Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-3xl p-6 shadow-md sticky top-24 bg-white border border-yellow-700/20">
              <div className="bg-yellow-700 h-0.5 w-8 rounded-full mx-auto mb-5" />
              <h2 className="text-2xl font-semibold mb-5 text-center font-serif">Price Details</h2>

              {/* Mode badge */}
              <div className="flex items-center justify-center gap-2 mb-4 py-2 rounded-xl bg-amber-50 border border-yellow-700/20">
                {isWallet ? (
                  <Wallet className="w-3.5 h-3.5 text-yellow-700" />
                ) : (
                  <Truck className="w-3.5 h-3.5 text-yellow-700" />
                )}
                <span className="text-xs uppercase tracking-widest text-yellow-800/70 font-serif">
                  {isWallet ? 'Keep in Wallet' : 'Delivery'}
                </span>
              </div>

              {/* Breakdown */}
              <div className="space-y-2 mb-4">
                {[
                  {
                    label: `Price (${totalItems} item${totalItems > 1 ? 's' : ''})`,
                    val: `₹${subtotal}`,
                    show: true,
                  },
                  { label: 'GST (3%)', val: `₹${gst}`, show: true },

                  { label: 'Delivery Charge', val: `₹${delivery}`, show: !isWallet },
                  { label: ' Handling', val: `₹${handlingFee}`, show: !isWallet },
                  { label: 'shipping Chanrge', val: `₹${shippingBase}`, show: !isWallet },
                ]
                  .filter((r) => r.show)
                  .map((r, i) => (
                    <div key={i}>
                      <div className="flex justify-between py-2">
                        <span className="text-xs text-yellow-800/70">{r.label}</span>
                        <span className="text-xs font-medium text-yellow-800/70">{r.val}</span>
                      </div>
                      <div className="w-full h-0.5 bg-yellow-700/10" />
                    </div>
                  ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center py-3 px-3 rounded-xl mb-5 bg-amber-100">
                <span className="text-xs uppercase tracking-widest font-semibold text-yellow-900">
                  Total Amount
                </span>
                <span className="text-2xl font-bold font-serif text-yellow-900">
                  ₹{finalAmount}
                </span>
              </div>

              {/* Items list */}
              {/* <div className="space-y-2 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="text-xs truncate flex-1 pr-2 text-yellow-800/70">
                      {item.name} <span>×{item.quantity}</span>
                    </span>
                    <span className="text-xs font-medium shrink-0 text-yellow-800/70">
                      ₹{(Number(item.price) * Number(item.quantity)).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div> */}

              {/* Trust badges */}
              <div className="rounded-2xl p-4 space-y-2 bg-amber-50 border border-yellow-700/10">
                {[
                  { icon: Shield, text: 'BIS Hallmarked jewellery' },
                  {
                    icon: Truck,
                    text: isWallet ? 'Securely stored in vault' : 'Free insured delivery',
                  },
                  { icon: Package, text: 'Premium gift packaging' },
                ].map((t, i) => {
                  const Icon = t.icon;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 shrink-0 text-yellow-700/60" />
                      <span className="text-xs text-yellow-800/60">{t.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-2 mt-4">
                <span>◈</span>
                <p className="text-xs text-yellow-800/60">
                  Crafted with care · Delivered with trust
                </p>
                <span>◈</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
