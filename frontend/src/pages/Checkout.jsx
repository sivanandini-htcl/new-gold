import { useCart } from '../components/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from "react";

import {
  ArrowLeft, CreditCard,MapPin,
  CheckCircle,ChevronRight,
  Truck, Shield,Package,Edit3,
  Plus,Wallet,Landmark,Smartphone,
  ShoppingCart, ArrowRight, Home,Briefcase,LoaderCircle,CircleCheckBig,Loader2
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';
import useAddressStore from '../store/addressStore';
import { generateHexId } from '../utils/orderId';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';
import MpinModal from '../components/MpinModal';
import AddressFormModal from '../components/checkoutComponents/AddressFormModal';

const labelIcons = {
  home: <Home size={14} />,
  work: <Briefcase size={14} />,
  other: <MapPin size={14} />,
};


function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems, totalAmount, totalItems } = useCartStore();
  const { addresses, loading: addrLoading, fetchAddresses, addAddress } = useAddressStore();
  const deliveryMode = location.state?.deliveryMode || 'wallet';
  const isWallet = deliveryMode === 'wallet';
  const userEmail = useAuthStore((s) => s.user?.email);

  const [activeStep, setActiveStep] = useState(isWallet ? 2 : 1);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [ordered, setOrdered] = useState(false);
  // const[walletApplied,setWalletApllied]=useState(false);
  const[showOption,setShowOption]=useState(false)
  const [selectedOption, setSelectedOption] = useState("");
  const[buttonLoading,setButtonLoading]=useState(false)
  const [loadingPaymentOptions, setLoadingPaymentOptions] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const [showMpin, setShowMpin] = useState(false);
  const [mpinLoading, setMpinLoading] = useState(false);
  const[successModal,setSuccessModal]=useState(false);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const[loadingPayment,setLoadingPayment]=useState(false);
  

  const checkoutData = location.state?.checkoutData;
  // console.log("checkout data",checkoutData);
  const pricing = checkoutData?.pricing;
  const cartId = checkoutData?.cartId;
  const sessionId = checkoutData?.checkoutSessionId;

  const subtotal = pricing?.subtotal ;
  const gst = pricing?.gstAmount;
  const gstPercent = pricing?.gstPercent;

  const delivery = pricing?.shippingBase;
  const handlingFee = pricing?.handlingFee;
  const shippingBase = pricing?.shippingBase;
  const finalAmount = pricing?.totalAmount;
  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);
  const walletBalance = paymentSummary?.walletBalanceINR || 0;
  const totalBillAmount =paymentSummary?.billingSummary?.totalAmountINR || finalAmount;


const [timeLeft, setTimeLeft] = useState(0);

const TIMER_DURATION = 5 * 60 * 1000; // 5 minutes in ms

useEffect(() => {
  let expiry = Number(localStorage.getItem("checkoutExpiry"));

 
  if (!expiry || expiry <= Date.now()) {
    expiry = Date.now() + TIMER_DURATION;
    localStorage.setItem("checkoutExpiry", expiry);
  }

  const timer = setInterval(() => {
    const remaining = Math.max(
      Math.floor((expiry - Date.now()) / 1000),
      0
    );

    setTimeLeft(remaining);

    if (remaining <= 0) {
      clearInterval(timer);
      localStorage.removeItem("checkoutExpiry");
      setShowTimeoutModal(true);
    }
  }, 1000);

  return () => clearInterval(timer);
}, []);

const minutes = Math.floor(timeLeft / 60);
const seconds = timeLeft % 60;



  // Fetch addresses on mount (delivery mode only)
  useEffect(() => {
    if (!isWallet) {
      fetchAddresses();
    }
  }, []);

  // Auto-select default address once addresses load
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
      setSelectedAddressId(defaultAddr.id);
    }
  }, [addresses]);

  const handleAddAddress = async (formData) => {
    const result = await addAddress(formData);
    if (result.success) {
      toast.success(result.message);
      setShowAddModal(false);
      // Auto-select newly added address
      const updated = useAddressStore.getState().addresses;
      const newest = updated[updated.length - 1];
      if (newest) setSelectedAddressId(newest.id);
    } else {
      toast.error("error");
    }
  };

  const handleApplyWallet=async ()=>{
    setLoadingSummary(true);
    setLoadingPaymentOptions(true)
    try{
      const walletres=await api.post('/orders/checkout/summary',
        {
          checkoutSessionId:sessionId,
          totalAmount:finalAmount,
          mode:isWallet ? 'WALLET' : 'DELIVERY',
        }
      )
      console.log("continue response" ,walletres.data)
      setPaymentSummary(walletres.data.data)
      setSelectedPaymentMethod(walletres.data.data.defaultMethod);
      // setWalletApllied(true);
      setShowOption(true)
    }catch(error){
      console.log("error"); 
     console.log("RESPONSE:", error.response);
     console.log("DATA:", error.response?.data);
     console.log("MESSAGE:", error.response?.data?.message);   
  }
  finally{
    setLoadingPaymentOptions(false);
  }

  }
  const handlemodal=()=>{
     setSuccessModal(false);
          navigate('/orders');
  }


const handleCheckout=async(mpin)=>{ 
  setLoadingPayment(true);
  
   try {
    if (!selectedMethod) {
      toast.error("Please select a payment method");
      return;
    }

    const idempotencyKey = generateHexId();

   const payload = {
  cartId,
  checkoutSessionId: sessionId,
  mode: isWallet ? "WALLET" : "DELIVERY",
  paymentProvider: selectedMethod.method,
  walletUsedINR: selectedMethod.walletUsedINR,
  gatewayAmountINR: selectedMethod.gatewayAmountINR,

  ...(!isWallet && {
    addressId: selectedAddress?.id,
    deliveryAddressId: selectedAddress?.id,
  }),

  ...(selectedMethod.method === "WALLET" ||
     selectedMethod.method === "HYBRID"
    ? { mpin }
    : {}),
};
    console.log("payload", payload);
    console.log("calling checkout api");
    console.log("Selected Method:", selectedMethod.method);
    console.log("MPIN:", mpin);
    console.log("Payload:", payload);
    const { data } = await api.post(
      "/orders/checkout",
      payload,
      {
        headers: {
          "idempotency-key": idempotencyKey,
        },
      }
    );
     console.log("calling checkout api")

    
    
    console.log("checkout response", data);
    

    if (!data.success) {
      toast.error(data.message);
      return;
    }

    // WALLET ONLY
    if (selectedMethod.method === "WALLET") {
      toast.success("Order placed successfully");
      navigate("/orders");
      return;
    }

    // HYBRID OR RAZORPAY
    openRazorpayPopup({
      order_id: data.data.razorpayOrderId,
      currency: "INR",
      backendOrderId: data.data.id,
    });

  } catch (error) {
  
    console.log("payment-failed API error:", error);
    console.log("RESPONSE:", error.response);
    console.log("DATA:", error.response?.data);

}
  finally{
    setButtonLoading(false);
    setLoadingPayment(false);
  }}

  const openRazorpayPopup = ({ order_id, currency, orderNumber, backendOrderId }) => {
    if (!window.Razorpay) { toast.error('Razorpay SDK not loaded'); return; }

    const rzp = new window.Razorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      currency: currency || 'INR',
      name: 'DgiGold',
      description: 'Order Payment',
      order_id,
      // handler: (response) => {
        
      //   handleVerifyPayment({
      //     razorpay_payment_id: response.razorpay_payment_id,
      //     razorpay_order_id: response.razorpay_order_id,
      //     razorpay_signature: response.razorpay_signature,
      //     orderId: backendOrderId,
      //   });
      // },
      handler:(response)=>{
        console.log("razorpay response",response)
    toast.success("Payment successful");
    setSuccessModal(true);
      },
      prefill: { email: userEmail || '' },
      theme: { color: '#b45309' },
     modal: {
    ondismiss: async () => {
    console.log("Payment popup dismissed");
    toast.warn("Payment cancelled");

    try {
      const payload = {
        orderId: backendOrderId,
        reason: "User cancelled payment",
      };

      console.log("Sending payload:", payload);

      const res = await api.post(
        "/orders/buy/payment-failed",
        payload
      );

      console.log("Payment-failed response:", res.data);
      

    } catch (err) {
      console.log("Payment-failed API error:", err);
      console.log("Response:", err.response);
      console.log("Data:", err.response?.data);
    }
  }
}
    });

    rzp.open();
    rzp.on('payment.failed', (response) => toast.error(response.error.description));
  };

  // const handleVerifyPayment = async (response) => {
  //   try {
  //     console.log("calling verify");
  //     const { data } = await api.post('/orders/buy/verify-payment', {
  //       orderId: response.orderId,
  //       razorpayOrderId: response.razorpay_order_id,
  //       razorpayPaymentId: response.razorpay_payment_id,
  //       razorpaySignature: response.razorpay_signature,
  //     });
  //     console.log("called verify");
  //     if (data.success) {
  //       setOrdered(true);
  //       toast.success('Payment verified');
  //       navigate("/orders")
  //       await api.delete('/cart');
  //     } else {
  //       toast.error('Verification failed');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     console.log("error0",err.response);
  //     toast.error(err.response?.data?.message || 'Verification error');
  //   }
  // };

  // ── Empty cart ──
 

  const selectedMethod = paymentSummary?.paymentMethods?.find(
  (item) => item.method === selectedOption
);


let visiblePaymentMethods = [];

if (walletBalance <= 0) {
  // No wallet money
  visiblePaymentMethods = ["RAZORPAY","WALLET"];
} else if (walletBalance < totalBillAmount) {
  // Partial wallet balance
  visiblePaymentMethods = ["HYBRID", "RAZORPAY"];
} else {
  // Wallet balance covers full amount
  visiblePaymentMethods = ["WALLET", "RAZORPAY"];
}
const handleGoToCart = () => {
  setShowTimeoutModal(false);
  localStorage.removeItem("checkoutExpiry");
  navigate("/cart");
};
  return (
    <div className="min-h-screen py-8 px-4 sm:px-3 bg-background">
      <div className="max-w-6xl mx-auto">

        {/* Time out Modal */}
              {showTimeoutModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="w-[90%] max-w-md rounded-2xl bg-[#111117] p-8 text-center shadow-2xl">

      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-300">
        <span className="text-3xl">!</span>
      </div>

      <h2 className="text-2xl font-bold text-white/60">
        Session Expired
      </h2>

      <p className="mt-3 text-gray-600">
        Your checkout session has expired after 5 minutes.
      </p>

      <p className="mt-1 text-gray-600">
        Please return to your cart and start checkout again.
      </p>

      <button
        onClick={() => handleGoToCart()}
        className="mt-6 w-full rounded-xl bg-primary py-3 font-semibold text-black"
      >
        Go to Cart
      </button>
    </div>
  </div>
)}
        {/* Header */}
  
        <div className="mb-6">
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center gap-2 text-xs 2xl:text-md uppercase tracking-widest transition text-primary/70 hover:text-yellow-600 mb-3"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </button>
          <div className="text-center">
            <h1 className="font-serif text-xl md:text-3xl text-center 2xl:text-3xl text-primary">Secure {" "}
              <span className=''>Checkout</span> </h1>
            <div className="inline-flex items-center gap-2 mt-2 px-4 py-1.5 rounded-full bg-primaryGoldGradient border border-yellow-700/20">
              {isWallet ? <Wallet className="w-3.5 h-3.5 text-yellow-900" /> : <Truck className="w-3.5 h-3.5 text-yellow-700" />}
              <span className="text-xs 2xl:text-lg uppercase tracking-widest text-background font-serif">
                {isWallet ? 'Keep in Wallet' : 'Delivery to Address'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">

            {/* STEP 0: Login — always done */}
            <div className="bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 rounded-xl p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center bg-green-100">
                  <CheckCircle className="w-4 h-4 text-green-600/70" />
                </div>
                <div>
                  <p className="text-xs 2xl:text-xl uppercase tracking-widest  text-primary/70">Step 1</p>
                  <p className="text-sm 2xl:text-lg text-white/70 font-semibold font-serif">Login</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium 2xl:text-lg text-green-600/70">Verified ✓</p>
                <p className="text-xs 2xl:text-xl text-white/70">{userEmail}</p>
              </div>
            </div>

            {/* STEP 1: Delivery Address — only in delivery mode */}
            {!isWallet && (
              <>
                {activeStep === 1 ? (
                  <div className="rounded-3xl p-6 shadow-md bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 flex items-center justify-center">
                        <span className="text-xs  font-bold text-amber-950">2</span>
                      </div>
                      <div>
                        <p className="text-xs 2xl:text-xl uppercase tracking-widest text-primary/70">Step 2</p>
                        <p className="text-base 2xl:text-lg font-semibold flex items-center gap-2 font-serif text-white/70">
                          <MapPin className="w-4 h-4 text-primary" /> Delivery Address
                        </p>
                      </div>
                    </div>

                    {/* Address list from store */}
                    {addrLoading ? (
                      <p className="text-sm 2xl:text-xl text-primary/70 text-center py-4">Loading addresses...</p>
                    ) : (
                      <div className="space-y-3 mb-4">
                        {addresses.map((addr) => {
                          const icon = labelIcons[addr.label?.toLowerCase()] || <MapPin size={14} />;
                          return (
                            <div
                              key={addr.id}
                              onClick={() => setSelectedAddressId(addr.id)}
                              className={`rounded-xl p-4 cursor-pointer border-2 transition ${
                                selectedAddressId === addr.id
                                  ? 'border-white/20 bg-[#111112]'
                                  : 'border-white/10 hover:border-white/70'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                {/* Radio button */}
                                <div
                                  className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                    selectedAddressId === addr.id ? 'border-white/70' : 'border-gray-400'
                                  }`}
                                >
                                  {selectedAddressId === addr.id && (
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                  )}
                                </div>

                                <div className="flex-1">
                                  <div className="inline-flex items-center gap-1.5  bg-primary text-amber-900 text-xs  2xl:text-lg px-2 font-medium px-2 py-0.5 rounded-full mb-1 capitalize">
                                    {icon}
                                    <span className='text-background'>{addr.label || 'Address'}</span>
                                
                                  </div>
                                  <p className="text-sm 2xl:text-2xl font-medium text-white/70 ">{addr.fullName}</p>
                                  <p className="text-xs 2xl:text-2xl text-white/70">{addr.phoneNumber}</p>
                                  <p className="text-xs 2xl:text-2xl text-white/70 mt-0.5">
                                    {[addr.addressLine1, addr.addressLine2, addr.city, addr.state, addr.pincode]
                                      .filter(Boolean)
                                      .join(', ')}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {/* Add New Address button */}
                        <button
                          onClick={() => setShowAddModal(true)}
                          className="w-full py-3 2xl:text-2xl rounded-2xl text-sm inline-flex items-center justify-center gap-2 text-primary border border-white/50  hover:bg-[#111112] transition"
                        >
                          <Plus className="w-4 h-4" /> Add New Address
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        if (!selectedAddressId) {
                          toast.error('Please select a delivery address');
                          return;
                        }
                        setActiveStep(2);
                      }}
                      className="w-full text-black 2xl:text-2xl bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition inline-flex items-center justify-center gap-2"
                    >
                      Deliver Here <ChevronRight className="w-4 h-4 text-black" />
                    </button>
                  </div>
                ) : (
                  activeStep > 1 && (
                    <div
                      className="bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 rounded-xl p-4  flex justify-between items-center cursor-pointer"
                      onClick={() => setActiveStep(1)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-green-100">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest 2xl:text-xl text-primary/70">Step 2 · Delivery Address</p>
                          <p className="text-sm 2xl:text-xl font-medium font-serif text-primary">
                            {selectedAddress
                              ? `${selectedAddress.addressLine1}, ${selectedAddress.city}`
                              : 'No address selected'}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs 2xl:text-xl uppercase tracking-widest text-yellow-700">Change</span>
                    </div>
                  )
                )}
              </>
            )}

            {/* STEP 2: Order Summary */}
            {activeStep === 2 ? (
              <div className="rounded-3xl p-3 shadow-md bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20  ">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-xs 2xl:text-2xl font-bold text-amber-950 ">{isWallet ? '2' : '3'}</span>
                  </div>
                  <div>
                    <p className="text-xs 2xl:text-xl uppercase tracking-widest text-primary/70">
                      {isWallet ? 'Step 2' : 'Step 3'}
                    </p>
                    <p className="text-base  2xl:text-xl font-semibold flex items-center gap-2 font-serif text-white/70">
                      <Package className="w-4 h-4 text-primary/80" /> Order Summary
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center py-2 border border-white/20 p-3 rounded-lg">
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-amber-50 flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl text-yellow-600">◈</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 text-white/70">
                        <p className="text-sm 2xl:text-xl font-medium truncate font-serif">{item.name}</p>
                        <p className="text-xs 2xl:text-xl text-primary/70"> Qty {item.quantity}</p>
                      </div>
                      <p className="text-sm 2xl:text-2xl font-semibold shrink-0 text-white/70 ">₹{item.totalPrice}</p>
                    </div>
                  ))}
                </div>

              
                  <div className="flex justify-center w-full py-2 ">
               <div className='border border-white/20 p-2 rounded-2xl w-full'>
                      <button onClick={handleApplyWallet} className="text-sm font-serif 2xl:text-xl text-background bg-primary rounded-2xl border w-full p-2">
                        
                        Select payment </button>   
                      </div>                      
                </div>
                          {loadingPaymentOptions ?(
                            <div className='text-center flex justify-center items-center'>
      <LoaderCircle className="w-5 h-5 animate-spin text-primary" />
       </div>):
    (<> 
    {showOption && (
            <>
    <div className="flex flex-col gap-3 mb-3">
     {paymentSummary?.paymentMethods?.filter((item) => visiblePaymentMethods.includes(item.method)) .map((item) => (
    
        <label
  key={item.method}
  className={`flex items-center gap-2 border border-white/20 p-3 rounded-xl
    ${
      item.method === "WALLET" && walletBalance <= 0
        ? "opacity-50 cursor-not-allowed"
        : "cursor-pointer"
    }`}>
          <input
  type="radio"
  name="paymentType"
  value={item.method}
  checked={selectedOption === item.method}
  disabled={item.method === "WALLET" && walletBalance <= 0}
  onChange={(e) => setSelectedOption(e.target.value)}
/>

            <div>
              <p className="text-white/80 font-medium">
                {item.label}
              </p>
              <p className="text-xs text-white/50">
                {item.description}
              </p>
            </div>
          </label>
        ))}
    </div>

    {/* BILL SUMMARY */}
   
  </>
)}</>
    )}
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
                      <p className="text-xs 2xl:text-xl uppercase tracking-widest text-primary/70">
                        {isWallet ? 'Step 2' : 'Step 3'} · Order Summary
                      </p>
                      <p className="text-sm font-medium font-serif">
                        {totalItems} {totalItems === 1 ? 'item' : 'items'} · ₹{subtotal}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs  2xl:text-xl uppercase tracking-widest text-yellow-700">Change</span>
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

                <div className="flex items-center justify-center gap-2 mt-3">
                  <Shield className="w-3 h-3 text-yellow-700/50" />
                  <p className="text-xs text-yellow-800/60">256-bit SSL encrypted · Safe & secure</p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Price Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-3xl p-6 shadow-md sticky top-24 bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20">
              <div className=" h-0.5 w-8 rounded-full mx-auto mb-5" />
              <h2 className="text-2xl 2xl:text-2xl font-semibold mb-1 text-center font-serif text-primary">Price Details</h2>

{/* timer */}

 <div className="mb-5 rounded-xl  p-3">
  <div className="flex items-center justify-end ">
    

    <span className="font-mono text-lg 2xl:text-2xl font-bold text-red-400 rounded-full border p-1">
      {String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </span>
  </div>
  </div>
              <div className="flex items-center justify-center gap-2 mb-4 py-2 rounded-xl ">
                {isWallet ? <Wallet className="w-3.5 h-3.5 text-primary/70" /> : <Truck className="w-3.5 h-3.5 text-yellow-700" />}
                <span className="text-xs 2xl:text-lg uppercase tracking-widest text-primary/70 font-serif">
                  {isWallet ? 'Keep in Wallet' : 'Delivery'}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {[
                  { label: `Price `, val: `₹${subtotal}`, show: true },
                  { label: `GST ${gstPercent}%`, val: `₹${gst}`, show: true },
                  { label: 'Delivery Charge', val: `₹${delivery}`, show: !isWallet },
                  { label: 'Handling', val: `₹${handlingFee}`, show: !isWallet },
                  { label: 'Shipping Charge', val: `₹${shippingBase}`, show: !isWallet },
                ]
                  .filter((r) => r.show)
                  .map((r, i) => (
                    <div key={i}>
                      <div className="flex justify-between py-2">
                        <span className="text-sm 2xl:text-xl text-primary/70">{r.label}</span>
                        <span className="text-sm 2xl:text-xl font-medium text-white/70">{r.val}</span>
                      </div>
                      <div className="w-full h-0.5 bg-yellow-700/10" />
                    </div>
                  ))}
                  {selectedMethod && (
                    <>
                    <div className="flex justify-between py-2">
                        <span className="text-sm 2xl:text-xl text-primary/70">Total Amount</span>
                        <span className="text-sm 2xl:text-xl font-medium text-white/70"> ₹{paymentSummary?.billingSummary?.totalAmountINR?.toFixed(2)}</span>
                      </div>
                      <div className="w-full h-0.5 bg-yellow-700/10" />

                       <div className="flex justify-between py-2">
                        <span className="text-sm 2xl:text-xl text-primary/70">Wallet Used</span>
                        <span className="text-sm 2xl:text-xl font-medium text-white/70"> 
                        ₹{selectedMethod.walletUsedINR?.toFixed(2)}</span>
                      </div>
                      <div className="w-full h-0.5 bg-yellow-700/10" />
                       <div className="flex justify-between py-2">
                        <span className="text-xl font-bold 2xl:text-xl text-primary/70">Amount To Pay</span>
                        <span className="text-xl
                         2xl:text-xl font-medium text-white/70">₹{selectedMethod.remainingPayableINR?.toFixed(2)}</span>
                      </div>
                      <div className="w-full h-0.5 bg-yellow-700/10" />
                           <div className='bg-primary p-2 rounded-2xl text-center font-serif text-background'>
                            {selectedMethod?.method === 'WALLET' || selectedMethod?.method === 'HYBRID'?(
                   <button onClick={()=>setShowMpin(true)}>
                      {buttonLoading?(
                        <div className='flex gap-1'>
                   <LoaderCircle className="w-5 h-5 animate-spin" />
                    Processing...
                   </div> ):("  Continue")}
                     </button>
                            ):(
                              <div className='flex items-center justify-center'>
                              {loadingPayment?(
                                <Loader2 className="w-5 h-5 animate-spin "/>
                              ):(
                                 <button onClick={handleCheckout}> Continue</button>
                              )

                              }
                              
                              </div>
                          
                            )}
                     
        </div>
        </> )}             
              </div>              
              <div className="rounded-2xl p-4 space-y-2 bg-[#111112] border border-yellow-700/10">
                {[
                  { icon: Shield, text: 'BIS Hallmarked jewellery' },
                  { icon: Truck, text: isWallet ? 'Securely stored in vault' : 'Free insured delivery' },
                  { icon: Package, text: 'Premium gift packaging' },
                ].map((t, i) => {
                  const Icon = t.icon;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 shrink-0 text-primary/60" />
                      <span className="text-xs 2xl:text-xl text-white/60">{t.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-2 mt-4">
                <span>◈</span>
                <p className="text-xs 2xl:text-md text-yellow-lg">Crafted with care · Delivered with trust</p>
                <span>◈</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <AddressFormModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddAddress}
          loading={addrLoading}
        />
      )}
     <MpinModal
        open={showMpin}
        loading={mpinLoading}
        onClose={() => setShowMpin(false)}
        title="Confirm Withdrawal"
        subtitle={`Withdraw `}
         onSubmit={(mpin) => handleCheckout(mpin)}

      />

    { successModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4">
    <div className="w-full max-w-sm rounded-3xl bg-[#0f0f17] border border-white/10 p-6 text-center flex flex-col gap-2 items-center justify-center">
      <h2 className="text-lg font-bold text-white">Payment Successful</h2>
      <CircleCheckBig className='text-green-500'size={28} />
      
      <button
        onClick={handlemodal}
        className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-bold text-background transition hover:brightness-110"
      >
        OK
      </button>
    </div>
  </div>
)}
    </div>
  );
}

export default Checkout;