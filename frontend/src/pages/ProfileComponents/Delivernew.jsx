// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { ArrowLeft, MapPin, Edit3, Save, X } from "lucide-react";

// const INDIAN_STATES = [
//   "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
//   "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
//   "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
//   "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
//   "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
//   "Andaman and Nicobar Islands", "Chandigarh", "Dadra & Nagar Haveli",
//   "Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
// ];

// function Delivery() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     address: "",
//     address1: "",
//     address2: "",
//     pincode: "",
//     area: "",
//     landmark: "",
//     city: "",
//     district: "",
//     state: "",
//     contact: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     console.log("saved data", formData);
//     toast.success("Address saved successfully!");
//     setIsEditing(false);
//   };

//   const inputStyle = {
//     background: "#fafaf8",
//     border: "1.5px solid #e8d5a3",
//     color: "#1a1000",
//     fontFamily: "Jost, sans-serif",
//     fontSize: "0.8rem",
//     borderRadius: "0.75rem",
//     padding: "0.625rem 0.875rem",
//     width: "100%",
//     outline: "none",
//     transition: "border-color 0.2s",
//   };

//   const viewStyle = {
//     background: "#fafaf8",
//     border: "1.5px solid #f0e8d0",
//     color: "#534328",
//     fontFamily: "Jost, sans-serif",
//     fontSize: "0.8rem",
//     borderRadius: "0.75rem",
//     padding: "0.625rem 0.875rem",
//     width: "100%",
//     minHeight: "38px",
//   };

//   const displayValue = (val, fallback = "Not provided") => val || fallback;

//   const textFields = [
//     { label: "Address", name: "address", type: "text", placeholder: "House / Flat / Building name", col: "lg:col-span-3" },
//     { label: "Address Line 1", name: "address1", type: "text", placeholder: "Street / Road" },
//     { label: "Address Line 2", name: "address2", type: "text", placeholder: "Area / Colony" },
//     { label: "Landmark", name: "landmark", type: "text", placeholder: "Near..." },
//     { label: "Pincode", name: "pincode", type: "number", placeholder: "6-digit pincode" },
//     { label: "City", name: "city", type: "text", placeholder: "City" },
//     { label: "District", name: "district", type: "text", placeholder: "District" },
//     { label: "Contact Number", name: "contact", type: "number", placeholder: "10-digit mobile" },
//   ];

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600&display=swap');
//         .delivery-root { font-family: 'Jost', sans-serif; }
//         .heading-font { font-family: 'Cormorant Garamond', serif; }
//         @keyframes shimmer {
//           0% { background-position: -200% center; }
//           100% { background-position: 200% center; }
//         }
//         .gold-shimmer-text {
//           background: linear-gradient(90deg, #b8860b 0%, #d4a017 20%, #f5d06e 40%, #e8c547 50%, #f5d06e 60%, #d4a017 80%, #b8860b 100%);
//           background-size: 200% auto;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           animation: shimmer 4s linear infinite;
//         }
//         .field-focus:focus {
//           border-color: #c8a84b !important;
//           box-shadow: 0 0 0 3px rgba(200,168,75,0.12);
//         }
//         .divider-gold {
//           background: linear-gradient(90deg, transparent, #c8a84b, #b0b0b0, #c8a84b, transparent);
//         }
//         select option { background: #fff; color: #1a1000; }
//       `}</style>

//       <div
//         className="delivery-root min-h-screen py-8 px-4 sm:px-6 lg:px-10"
//         style={{ background: "linear-gradient(135deg, #f7f3eb 0%, #f0ece0 50%, #ede8da 100%)" }}
//       >
//         <div className="max-w-4xl mx-auto">

//           {/* ── Back Button ── */}
//           <button
//             onClick={() => navigate("/profile")}
//             className="inline-flex items-center gap-2 mb-6 text-xs uppercase tracking-widest transition"
//             style={{ color: "#7a6a50", background: "none", border: "none", cursor: "pointer" }}
//             onMouseEnter={e => e.currentTarget.style.color = "#c8a84b"}
//             onMouseLeave={e => e.currentTarget.style.color = "#7a6a50"}
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back to Profile
//           </button>

//           {/* ── Page Title ── */}
//           <div className="mb-8" style={{ borderBottom: "1px solid rgba(200,168,75,0.25)", paddingBottom: "1.25rem" }}>
//             <div className="divider-gold h-0.5 w-12 rounded-full mb-3" />
//             <h1 className="heading-font text-5xl font-bold" style={{ color: "#2a1f0e" }}>
//               Delivery <span className="gold-shimmer-text">Address</span>
//             </h1>
//             <p className="mt-1 text-xs uppercase tracking-widest" style={{ color: "#a09070" }}>
//               {isEditing ? "Editing Mode · Update your delivery details" : "Your saved delivery information"}
//             </p>
//           </div>

//           {/* ── Form Card ── */}
//           <div
//             className="rounded-3xl p-6 sm:p-8 shadow-md mb-6"
//             style={{ background: "rgba(255,255,255,0.97)", border: "1px solid rgba(200,168,75,0.25)" }}
//           >
//             {/* Section header */}
//             <div className="flex items-center gap-2 mb-6">
//               <div
//                 className="w-9 h-9 rounded-xl flex items-center justify-center"
//                 style={{ background: "#fdf3c8" }}
//               >
//                 <MapPin className="w-4 h-4" style={{ color: "#c8a84b" }} />
//               </div>
//               <div>
//                 <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "#7a6a50" }}>
//                   Address Details
//                 </p>
//                 <p className="text-xs" style={{ color: "#a09070" }}>
//                   This address will be used for jewellery redemption deliveries
//                 </p>
//               </div>
//             </div>

//             <div className="divider-gold h-px w-full opacity-30 mb-6" />

//             {/* Address (full width) */}
//             <div className="mb-5">
//               <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium" style={{ color: "#7a6a50" }}>
//                 Address
//               </label>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   placeholder="House / Flat / Building name"
//                   className="field-focus"
//                   style={inputStyle}
//                 />
//               ) : (
//                 <div style={viewStyle}>{displayValue(formData.address)}</div>
//               )}
//             </div>

//             {/* Grid fields */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">

//               {/* Address Line 1 */}
//               <div>
//                 <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium" style={{ color: "#7a6a50" }}>
//                   Address Line 1
//                 </label>
//                 {isEditing ? (
//                   <input type="text" name="address1" value={formData.address1} onChange={handleChange}
//                     placeholder="Street / Road" className="field-focus" style={inputStyle} />
//                 ) : (
//                   <div style={viewStyle}>{displayValue(formData.address1)}</div>
//                 )}
//               </div>

//               {/* Address Line 2 */}
//               <div>
//                 <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium" style={{ color: "#7a6a50" }}>
//                   Address Line 2
//                 </label>
//                 {isEditing ? (
//                   <input type="text" name="address2" value={formData.address2} onChange={handleChange}
//                     placeholder="Area / Colony" className="field-focus" style={inputStyle} />
//                 ) : (
//                   <div style={viewStyle}>{displayValue(formData.address2)}</div>
//                 )}
//               </div>

//               {/* Landmark */}
//               <div>
//                 <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium" style={{ color: "#7a6a50" }}>
//                   Landmark
//                 </label>
//                 {isEditing ? (
//                   <input type="text" name="landmark" value={formData.landmark} onChange={handleChange}
//                     placeholder="Near..." className="field-focus" style={inputStyle} />
//                 ) : (
//                   <div style={viewStyle}>{displayValue(formData.landmark)}</div>
//                 )}
//               </div>

//               {/* Pincode */}
//               <div>
//                 <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium" style={{ color: "#7a6a50" }}>
//                   Pincode
//                 </label>
//                 {isEditing ? (
//                   <input type="number" name="pincode" value={formData.pincode} onChange={handleChange}
//                     placeholder="6-digit pincode" maxLength={6} className="field-focus" style={inputStyle} />
//                 ) : (
//                   <div style={viewStyle}>{displayValue(formData.pincode)}</div>
//                 )}
//               </div>

//               {/* City */}
//               <div>
//                 <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium" style={{ color: "#7a6a50" }}>
//                   City
//                 </label>
//                 {isEditing ? (
//                   <input type="text" name="city" value={formData.city} onChange={handleChange}
//                     placeholder="City" className="field-focus" style={inputStyle} />
//                 ) : (
//                   <div style={viewStyle}>{displayValue(formData.city)}</div>
//                 )}
//               </div>

//               {/* District */}
//               <div>
//                 <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium" style={{ color: "#7a6a50" }}>
//                   District
//                 </label>
//                 {isEditing ? (
//                   <input type="text" name="district" value={formData.district} onChange={handleChange}
//                     placeholder="District" className="field-focus" style={inputStyle} />
//                 ) : (
//                   <div style={viewStyle}>{displayValue(formData.district)}</div>
//                 )}
//               </div>

//               {/* State */}
//               <div>
//                 <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium" style={{ color: "#7a6a50" }}>
//                   State
//                 </label>
//                 {isEditing ? (
//                   <select name="state" value={formData.state} onChange={handleChange}
//                     className="field-focus" style={inputStyle}>
//                     <option value="">Select State</option>
//                     {INDIAN_STATES.map((s, i) => (
//                       <option key={i} value={s}>{s}</option>
//                     ))}
//                   </select>
//                 ) : (
//                   <div style={viewStyle}>{displayValue(formData.state)}</div>
//                 )}
//               </div>

//               {/* Contact */}
//               <div>
//                 <label className="block text-xs uppercase tracking-widest mb-1.5 font-medium" style={{ color: "#7a6a50" }}>
//                   Contact Number
//                 </label>
//                 {isEditing ? (
//                   <input type="number" name="contact" value={formData.contact} onChange={handleChange}
//                     placeholder="10-digit mobile" className="field-focus" style={inputStyle} />
//                 ) : (
//                   <div style={viewStyle}>
//                     {formData.contact ? `+91-${formData.contact}` : "Not provided"}
//                   </div>
//                 )}
//               </div>

//             </div>
//           </div>

//           {/* ── Action Buttons ── */}
//           <div className="flex flex-wrap justify-center gap-3">
//             {!isEditing ? (
//               <>
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold transition hover:opacity-90"
//                   style={{
//                     background: "linear-gradient(135deg, #c8a84b 0%, #e8c86a 40%, #d4a932 70%, #b8860b 100%)",
//                     color: "#1a1000",
//                     boxShadow: "0 4px 20px rgba(200,168,75,0.35)",
//                   }}
//                 >
//                   <Edit3 className="w-4 h-4" />
//                   Edit Address
//                 </button>

//                 <button
//                   onClick={() => navigate("/profile")}
//                   className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold transition hover:opacity-80 bg-white"
//                   style={{ border: "1.5px solid #e8d5a3", color: "#7a6a50" }}
//                 >
//                   <ArrowLeft className="w-4 h-4" />
//                   Back
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button
//                   onClick={handleSave}
//                   disabled={loading}
//                   className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold transition hover:opacity-90"
//                   style={{
//                     background: "linear-gradient(135deg, #5a8a5a, #7ab07a)",
//                     color: "#fff",
//                     boxShadow: "0 4px 16px rgba(90,138,90,0.3)",
//                   }}
//                 >
//                   <Save className="w-4 h-4" />
//                   {loading ? "Saving..." : "Save Address"}
//                 </button>

//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold transition hover:opacity-80 bg-white"
//                   style={{ border: "1.5px solid #e8d5a3", color: "#7a6a50" }}
//                 >
//                   <X className="w-4 h-4" />
//                   Cancel
//                 </button>
//               </>
//             )}
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

// export default Delivery;