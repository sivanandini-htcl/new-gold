// import { useCart } from "../components/CartContext";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import {
//   ArrowLeft, CreditCard, MapPin, CheckCircle, ChevronRight,
//   Truck, Shield, Package, Edit3, Plus, Wallet, Landmark, Smartphone,ShoppingCart ,ArrowRight
// } from "lucide-react";
// import { useOrders } from "../components/OrderContext";

// const STEPS = ["Login", "Delivery Address", "Order Summary", "Payment"];


// // Saved addresses (in real app, fetched from backend)
// const SAVED_ADDRESSES = [
//   { id: 1, name: "Home", address: "12, MG Road", city: "Bangalore", pincode: "5600001", phone: "9876543210" },
//   { id: 2, name: "Office", address: "13, Whitefield", city: "Bangalore", pincode: "560002", phone: "9123456780" },
// ];

// const PAYMENT_OPTIONS = [
//   { id: "upi",  label: "UPI", icon: Smartphone,  desc: "Pay via any UPI app" },
//   { id: "card", label: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, Rupay" },
//   { id: "nb",   label: "Net Banking",  icon: Landmark,    desc: "All major banks" },
//   { id: "cod",  label: "Cash on Delivery", icon: Wallet,  desc: "Pay when delivered" },
// ];
// const details=[
//                         { name: "name", placeholder: "Full Name", type: "text" },
//                         { name: "phone", placeholder: "Phone Number", type: "tel" },
//                         { name: "address", placeholder: "Full Address", type: "text" },
//                       ];

// function Checkout() {
//   const { cartItems, totalAmount, totalItems, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [activeStep, setActiveStep] = useState(1); // 0=login(done), 1=address, 2=summary, 3=payment
//   const [selectedAddress, setSelectedAddress] = useState(SAVED_ADDRESSES[0].id);
//   const [addingNew, setAddingNew] = useState(false);
//   const [selectedPayment, setSelectedPayment] = useState("upi");
//   const [upiId, setUpiId] = useState("");
//   const [ordered, setOrdered] = useState(false);
//   const { addOrder } = useOrders();


//   const [newAddr, setNewAddr] = useState({ name: "", phone: "", address: "", city: "", pincode: "" });

//   const gst = totalAmount * 0.03;
//   const delivery = 1550;
//   const insurance = 500;
//   const finalAmount = totalAmount + gst + delivery + insurance;

 
//   const placeOrder = () => {

//   const newOrder = {
//     id: Date.now(),
//     items: cartItems,
//     total: cartItems.reduce((sum, item) => sum + item.totalPrice, 0),
    
    
//   };

//   addOrder(newOrder); 
//     setOrdered(true);
//   };

//   if (cartItems.length === 0) {
//     return (
//       <>
        
//         <div
//           className="cart-root min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-50">
//           <div
//             className="rounded-3xl p-12 shadow-lg text-center max-w-sm w-full bg-white">
//             <div className="h-0.5 w-12 rounded-full mx-auto mb-6"/>
//             <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" >
//               <ShoppingCart size={80} className=" p-2 rounded-4xl text-yellow-700 hover:scale-125 active:scale-90 transition duration-200 animate-bounce"  />
//               {/* <Heart className="text-red-500 hover:scale-125 active:scale-90 transition duration-300 animate-spin"/> */}
//             </div>
//             <h1 className="text-4xl font-serif mb-2" >
//               Your Cart
//             </h1>
//             <p className="text-xs uppercase tracking-widest mb-6 font-serif" >
//               No items yet
//             </p>
//             <p className="text-sm mb-8 font-serif" >
//               Your cart is empty. Explore our jewellery collection and start adding pieces.
//             </p>
//             <button
//               onClick={() => navigate("/redeem")}
//               className="w-full py-3.5 rounded-xl  bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 text-sm uppercase tracking-widest font-serif transition hover:opacity-90 inline-flex items-center justify-center gap-2"
            
//             >
//               Browse Jewellery
//               <ArrowRight className="w-4 h-4" />
//             </button>
//             <div className="bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 h-0.5 w-10 rounded-full mx-auto mt-6" />
//           </div>
//         </div>
//       </>
//     );
//   }


//   if (ordered) {
//     return (
//       <>
        
//         <div className="co-root min-h-screen flex items-center justify-center px-4">
//           <div className="rounded-3xl p-12 text-center shadow-lg max-w-sm w-full">
//             <div className="divider-gold h-0.5 w-12 rounded-full mx-auto mb-6" />
//             <div className="pop w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
//               <CheckCircle className="w-8 h-8" />
//             </div>
//             <h2 className="heading-font text-4xl font-bold mb-2" >
//               Order <span className="gold-shimmer-text">Confirmed!</span>
//             </h2>
//             <p className="text-xs uppercase tracking-widest mb-2 " >
//               Thank you for your purchase
//             </p>
//             <p className="text-sm leading-relaxed mb-8 text-[#7a6a50]">
//               Your jewellery will be delivered within 3–5 business days. You'll receive a tracking update on your registered number.
//             </p>
//             <button onClick={() => navigate("/")}
//               className="w-full py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition">
//               Back to Home
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
      
//    <div className=" min-h-screen py-8 px-4 sm:px-6 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100"
//        >
//         <div className="max-w-6xl mx-auto">

//           {/* ── Header ── */}
//           <div className="mb-6 flex items-center justify-between">
//             <button onClick={() => navigate("/cart")}
//               className="inline-flex items-center gap-2 text-xs uppercase tracking-widest transition"
//               >
//               <ArrowLeft className="w-4 h-4" /> Back to Cart
//             </button>
//             <div className="text-center">
//               <div className=" h-0.5 w-12 rounded-full mx-auto mb-1 flex justify-center" />
//               <h1 className="heading-font font-serif text-3xl font-bold text-center">
//                 Secure <span className="font-serif" >Checkout</span>
//               </h1>
//             </div>
//             <div className="flex items-center gap-1" >
//               <Shield className="w-3.5 h-3.5" /> 
//               {/* SSL Secured */}
//             </div>
//           </div>

//           <div className="grid lg:grid-cols-3 gap-6">

//             {/* LEFT: Stepper */}
//             <div className="lg:col-span-2 space-y-3">

//               {/*  STEP 0: Login  */}
//               <div className="collapsed-panel"
//                 >
//                 <div className="flex items-center gap-3">
//                   <div className="w-7 h-7 rounded-full flex items-center justify-center"
//                    >
//                     <CheckCircle className="w-4 h-4 text-black" />
//                   </div>
//                   <div>
//                     <p className="text-xs uppercase tracking-widest">Step 1</p>
//                     <p className="text-sm font-semibold" >Login / Account</p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-xs font-medium" >Verified ✓</p>
//                   <p className="text-xs" >user@email.com</p>
//                 </div>
//               </div>

//               {/*STEP 1: Delivery Address */}
//               {activeStep === 1 ? (
//                 <div className="rounded-3xl p-6 shadow-md step-panel bg-white border border-yellow-900/40"
//                   >
//                   {/* Step header */}
//                   <div className="flex items-center gap-3 mb-5">
//                     <div className="w-7 h-7 rounded-full flex items-center justify-center">
//                       <span className="text-xs font-bold text-amber-950">2</span>
//                     </div>
//                     <div>
//                       <p className="text-xs uppercase tracking-widest" >Step 1</p>
//                       <p className="text-base font-semibold flex items-center gap-2" >
//                         <MapPin className="w-4 h-4" /> Delivery Address
//                       </p>
//                     </div>
//                   </div>

//                   {/* Saved addresses */}
//                   {!addingNew && (
//                     <div className="space-y-3 mb-4 bg-white ">
//                       {SAVED_ADDRESSES.map((addr) => (
//                         <div key={addr.id}
//                           className=" rounded-2xl p-2 md:p-4"        
//                           onClick={() => setSelectedAddress(addr.id)}>
//                           <div className="flex items-start gap-3 border border-yellow-700 rounded-xl p-2 md:p-5">                     

//                  <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0
//   ${selectedAddress === addr.id ? "bg-black" : "border-gray-400"}`}/>
//                             <div className="flex-1">
//                               <div className="flex items-center gap-2 mb-0.5">
//                                 <span className="text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full"
//                                  >{addr.name}</span>
//                               </div>
//                               <p className="text-sm font-medium mb-0.5" >{addr.address}</p>
//                               <p className="text-xs" >{addr.city} – {addr.pincode}</p>
//                               <p className="text-xs mt-0.5"> {addr.phone}</p>
//                             </div>
//                             <button onClick={(e) => { e.stopPropagation(); }}
//                               className="shrink-0 p-1.5 rounded-lg transition hover:opacity-70"
//                               >
//                               <Edit3 className="w-3 h-3"  />
//                             </button>
//                           </div>
//                         </div>
//                       ))}


//                       {/* Add new */}
//                       <button onClick={() => setAddingNew(true)}
//                         className="w-full py-3 rounded-2xl text-sm inline-flex items-center justify-center gap-2 transition hover:opacity-80 border border-yellow-900/40 text-yellow-900">
//                         <Plus className="w-4 h-4" /> Add New Address
//                       </button>
//                     </div>
//                   )}

//                   {/* New Address form */}
//                   {addingNew && (
//                     <div className="space-y-3 mb-4 p-4 rounded-2xl"
//                      >
//                       <p className="text-xs uppercase tracking-widest font-semibold mb-2" >
//                         New Address
//                       </p>
//                       {details.map(f => (
//                         <input key={f.name} type={f.type} placeholder={f.placeholder}
//                           value={newAddr[f.name]}
//                           onChange={e => setNewAddr({ ...newAddr, [f.name]: e.target.value })}
//                           className="border border-yellow-900  p-2 rounded-md flex w-full"  />
//                       ))}
//                       <div className="grid grid-cols-2 gap-3 ">
//                         <input type="text" placeholder="City" value={newAddr.city}
//                           onChange={e => setNewAddr({ ...newAddr, city: e.target.value })}
//                           className="border border-yellow-900  p-2 rounded-md"/>

//                         <input type="text" placeholder="Pincode" value={newAddr.pincode}
//                           onChange={e => setNewAddr({ ...newAddr, pincode: e.target.value })}
//                           className="border border-yellow-900 mr-2 p-2 rounded-md w-full"/>
//                       </div>
//                       <div className="flex gap-2 mt-2">
//                         <button onClick={() => setAddingNew(false)}
//                           className="flex-1 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold border border-yellow-900">
//                           Cancel
//                         </button>
//                         <button onClick={() => setAddingNew(false)}
//                           className="flex-1 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold hover:opacity-90 border border-yellow-900 bg-yellow-800">
//                           Save Address
//                         </button>
//                       </div>
//                     </div>
//                   )}

//                   <button onClick={() => setActiveStep(2)}
//                     className="w-full bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition inline-flex items-center justify-center gap-2"
//                     >
//                     Deliver Here <ChevronRight className="w-4 h-4 text-black" />
//                   </button>
//                 </div>
//               ) : (
//                 /* Collapsed address */
//                 activeStep > 1 && (
//                   <div className="collapsed-panel bg-white rounded-xl p-2"
//                     onClick={() => setActiveStep(1)}>
//                     <div className="flex items-center gap-3">
//                       <div className="w-7 h-7 rounded-full flex items-center justify-center" >
//                         <CheckCircle className="w-4 h-4 text-black" />
//                       </div>
//                       <div>
//                         <p className="text-xs uppercase tracking-widest" >Step 2 · Delivery Address</p>
//                         <p className="text-sm font-medium">
//                           {SAVED_ADDRESSES.find(a => a.id === selectedAddress)?.address}, {SAVED_ADDRESSES.find(a => a.id === selectedAddress)?.city}
//                         </p>
//                       </div>
//                     </div>
//                     <span className="text-xs uppercase tracking-widest cursor-pointer">Change</span>
//                   </div>
//                 )
//               )}

//               {/* ───── STEP 2: Order Summary ───── */}
//               {activeStep === 2 ? (
//                 <div className="rounded-3xl p-6 shadow-md step-panel bg-white border border-yellow-900"
//                   >
//                   <div className="flex items-center gap-3 mb-5  ">
//                     <div className="w-7 h-7 rounded-full flex items-center justify-center">
//                       <span className="text-xs font-bold text-amber-950">3</span>
//                     </div>
//                     <div>
//                       <p className="text-xs uppercase tracking-widest" >Step 3</p>
//                       <p className="text-base font-semibold flex items-center gap-2" >
//                         <Package className="w-4 h-4"/> Order Summary
//                       </p>
//                     </div>
//                   </div>

//                   {/* Items */}
//                   <div className="space-y-3 mb-4 ">
//                     {cartItems.map((item) => {
//                       const isGold = item.type === "gold";
//                       return (
//                         <div key={item.id} className="flex gap-3 items-center py-2 border border-yellow-900 p-3 rounded-lg ">
//                           <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 ">
//                             <img src={item.image} alt={item.name}
//                               className="w-full h-full object-cover"
//                               onError={e => e.target.src = "https://via.placeholder.com/56?text=◈"}/>
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm font-medium truncate">{item.name}</p>
//                             <p className="text-xs" >{item.weight}g · Qty {item.quantity}</p>
//                           </div>
//                           <p className="text-sm font-semibold shrink-0">
//                             ₹{(item.price * item.quantity).toLocaleString("en-IN")}
//                           </p>
//                         </div>
//                       );
//                     })}
//                   </div>

//                   <button onClick={() => setActiveStep(3)}
//                className="w-full py-3.5 
//                bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 rounded-xl 
//                text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition 
//                inline-flex items-center justify-center gap-2 bg-yellow-100">
//                     Continue to Payment <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               ) : (
//                 activeStep > 2 && (
//                   <div className="bg-white border border-yellow-900 p-3 rounded-lg"
                    
//                     onClick={() => setActiveStep(2)}>
//                     <div className="flex items-center gap-3 bg-white">
//                       <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white"
//                         >
//                         <CheckCircle className="w-4 h-4 text-black" />
//                       </div>
//                       <div>
//                         <p className="text-xs uppercase tracking-widest bg-white" >Step 3 · Order Summary</p>
//                         <p className="text-sm font-medium" >
//                           {totalItems} {totalItems === 1 ? "item" : "items"} · ₹{totalAmount.toLocaleString("en-IN")}
//                         </p>
//                       </div>
//                     </div>
//                     <span className="text-xs uppercase tracking-widest" >Change</span>
//                   </div>
//                 )
//               )}

//               {/* ───── STEP 3: Payment ───── */}
//               {activeStep === 3 && (
//                 <div className="rounded-3xl p-6 shadow-md bg-white border border-yellow-900"
//                   >
//                   <div className="flex items-center gap-3 mb-5">
//                     <div className="w-7 h-7 rounded-full flex items-center justify-center"
//                       >
//                       <span className="text-xs font-bold text-amber-950">4</span>
//                     </div>
//                     <div>
//                       <p className="text-xs uppercase tracking-widest" >Step 4</p>
//                       <p className="text-base font-semibold flex items-center gap-2" >
//                         <CreditCard className="w-4 h-4"  /> Payment Options
//                       </p>
//                     </div>
//                   </div>

//                   {/* Payment options */}
//                   <div className="space-y-3 mb-5">
//                     {PAYMENT_OPTIONS.map((opt) => {
//                       const Icon = opt.icon;
//                       const active = selectedPayment === opt.id;
//                       return (
//                         <div key={opt.id}
//                           className="pay-opt rounded-2xl p-4"
                          
//                           onClick={() => setSelectedPayment(opt.id)}>
//                           <div className="flex items-center gap-3 border border-yellow-900 p-3 rounded-lg">

//                             {/* radio */}
                           
//                             <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ">
//                               {active &&<div className="w-2 h-2 rounded-full bg-black"/>}
//                             </div>
//                             <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0">
//                               <Icon className="w-4 h-4 "  />
//                             </div>
//                             <div>
//                               <p className="text-sm font-semibold ">{opt.label}</p>
//                               <p className="text-xs" >{opt.desc}</p>
//                             </div>
//                           </div>

//                           {/* UPI sub-field */}
//                           {active && opt.id === "upi" && (
//                             <div className="mt-3 pl-7 ">
//                               <input type="text" placeholder="Enter UPI ID (e.g. name@upi)"
//                                 value={upiId} onChange={e => setUpiId(e.target.value)} 
//                                  />
//                             </div>
                            
//                           )}
//                         </div>
                        
//                       );
//                     })}
//                   </div>
                      


//                   <button onClick={placeOrder}
//                     className="w-full bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 py-4 rounded-xl text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition inline-flex items-center justify-center gap-2 bg-yellow-100">
//                     <CreditCard className="w-4 h-4" />
//                     Place Order · ₹{finalAmount.toLocaleString("en-IN")}
//                   </button>
//                   <div className="flex items-center justify-center gap-2 mt-3">
//                     <Shield className="w-3 h-3"  />
//                     <p className="text-xs" >256-bit SSL encrypted · Safe & secure</p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* ── RIGHT: Price Summary ── */}
//             <div className="lg:col-span-1 bg-white rounded-4xl text-yellow-900 ">
//               <div className="rounded-3xl p-6 shadow-md sticky top-24"
//                 >
//                 <div className="bg-yellow-700 h-0.5 w-8 rounded-full mx-auto mb-5" />

//                 <h2 className="heading-font text-2xl font-semibold mb-5 text-center">
//                   Price Details
//                 </h2>

//                 {/* Breakdown */}
//                 <div className="space-y-3 mb-4">
//                   {[
//                     { label: `Price (${totalItems} item${totalItems > 1 ? "s" : ""})`, val: `₹${totalAmount.toLocaleString("en-IN")}` },
//                     { label: "GST (3%)", val: `₹${gst.toFixed(2)}` },
//                     { label: "Delivery Charge", val: `₹${delivery.toLocaleString("en-IN")}` },
//                     { label: "Insurance / Handling", val: `₹${insurance}` },
//                   ].map((r, i) => (
//                     <div><div key={i} className="flex justify-between py-2"
//                       >
//                       <span className="text-xs" >{r.label}</span>
//                       <span className="text-xs font-medium" >{r.val}</span>
                   
//                     </div>
//                         <div className="w-full h-0.5 bg-yellow-700/20"/>
//                     </div>
  
                    
                    
//                   ))}
                 
//                 </div>

//                 {/* Total */}
//                 <div className="flex justify-between items-center py-3 px-3 rounded-xl mb-5"
//                   >
//                   <span className="text-xs uppercase tracking-widest font-semibold" >
//                     Total Amount
//                   </span>
//                   <span className="heading-font text-2xl font-bold ">
//                     ₹{finalAmount.toLocaleString("en-IN")}
//                   </span>
//                 </div>

//                 {/* Items list */}
//                 <div className="space-y-2 mb-4">
//                   {cartItems.map((item) => (
//                     <div key={item.id} className="flex justify-between items-center">
//                       <span className="text-xs truncate flex-1 pr-2" >
//                         {item.name} <span>×{item.quantity}</span>
//                       </span>
//                       <span className="text-xs font-medium shrink-0" >
//                         ₹{(item.price * item.quantity).toLocaleString("en-IN")}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Trust badges */}
//                 <div className="rounded-2xl p-4 space-y-2">
//                   {[
//                     { icon: Shield, text: "BIS Hallmarked jewellery" },
//                     { icon: Truck,  text: "" },
//                     { icon: Package, text: "Premium gift packaging" },
//                   ].map((t, i) => {
//                     const Icon = t.icon;
//                     return (
//                       <div key={i} className="flex items-center gap-2">
//                         <Icon className="w-3.5 h-3.5 shrink-0"  />
//                         <span className="text-xs" >{t.text}</span>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 <div className="flex items-center justify-center gap-2 mt-4">
//                   <span>◈</span>
//                   <p className="text-xs" >Crafted with care · Delivered with trust</p>
//                   <span>◈</span>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Checkout;